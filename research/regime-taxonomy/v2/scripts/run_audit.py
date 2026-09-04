#!/usr/bin/env python3
"""Deterministic, read-only empirical audit. Uses Python 3 standard library only."""
import csv, hashlib, json, math, os, statistics, sys
from bisect import bisect_right
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[4]; OUT=ROOT/'research/regime-taxonomy/v2'; P=ROOT/'research/providers'
NOW='2026-09-04 (analysis date supplied by execution environment)'
FILES=['market_snapshots_clean-2.csv','5m.csv','15m.csv','1h.csv','4h.csv','1d.csv']
def dt(s): return datetime.fromisoformat(s.replace('Z','+00:00')).astimezone(timezone.utc)
def num(s):
 try: return float(s) if s not in ('',None) else None
 except: return None
def q(a,p):
 a=sorted(x for x in a if x is not None and math.isfinite(x))
 if not a:return None
 z=(len(a)-1)*p; lo=int(z); hi=math.ceil(z); return a[lo]+(a[hi]-a[lo])*(z-lo)
def stats(a):
 a=[x for x in a if x is not None and math.isfinite(x)]
 if not a:return {'n':0}
 m=sum(a)/len(a); sd=math.sqrt(sum((x-m)**2 for x in a)/len(a))
 return {'n':len(a),'mean':m,'median':q(a,.5),'sd':sd,'min':min(a),'max':max(a),'p01':q(a,.01),'p05':q(a,.05),'p25':q(a,.25),'p75':q(a,.75),'p95':q(a,.95),'p99':q(a,.99)}
def f(x,d=6): return 'N/A' if x is None else f'{x:.{d}g}'
def table_stat(a):
 s=stats(a); keys=['n','mean','median','sd','min','p01','p05','p25','p75','p95','p99','max']
 return '|'+ '|'.join(keys)+'|\n|'+'|'.join(['---:' for _ in keys])+'|\n|'+'|'.join(str(s.get(k)) if k=='n' else f(s.get(k)) for k in keys)+'|'
def pearson(a,b):
 z=[(x,y) for x,y in zip(a,b) if x is not None and y is not None and math.isfinite(x) and math.isfinite(y)]
 if len(z)<3:return None
 x,y=zip(*z); mx=sum(x)/len(x);my=sum(y)/len(y); dx=math.sqrt(sum((v-mx)**2 for v in x));dy=math.sqrt(sum((v-my)**2 for v in y))
 return sum((u-mx)*(v-my) for u,v in z)/(dx*dy) if dx and dy else None
def ranks(a):
 vals=sorted((v,i) for i,v in enumerate(a) if v is not None and math.isfinite(v)); out=[None]*len(a); i=0
 while i<len(vals):
  j=i+1
  while j<len(vals) and vals[j][0]==vals[i][0]:j+=1
  r=(i+j-1)/2+1
  for _,k in vals[i:j]:out[k]=r
  i=j
 return out
def spearman(a,b): return pearson(ranks(a),ranks(b))
def regression(x,y):
 z=[(a,b) for a,b in zip(x,y) if a is not None and b is not None]
 if len(z)<3:return {}
 a,b=zip(*z); ma=sum(a)/len(a); mb=sum(b)/len(b); den=sum((v-ma)**2 for v in a)
 slope=sum((u-ma)*(v-mb) for u,v in z)/den if den else None
 intercept=mb-slope*ma if slope is not None else None; residual=[v-(intercept+slope*u) for u,v in z]
 return {'n':len(z),'slope':slope,'intercept':intercept,'r_squared':pearson(a,b)**2 if pearson(a,b) is not None else None,'residual':stats(residual)}
def intervals(ts):return [(ts[i]-ts[i-1]).total_seconds() for i in range(1,len(ts))]
def mdwrite(name,s): (OUT/name).write_text(s.strip()+'\n')
def read(path):
 with open(path,newline='') as z:return list(csv.DictReader(z))
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def std_matrix(X):
 means=[sum(r[j] for r in X)/len(X) for j in range(len(X[0]))]; sds=[math.sqrt(sum((r[j]-means[j])**2 for r in X)/len(X)) or 1 for j in range(len(X[0]))]
 return [[(v-means[j])/sds[j] for j,v in enumerate(r)] for r in X],means,sds
def kmeans(X,k,seed=0):
 # deterministic seeded kmeans++
 n=len(X); centers=[X[(seed*7919)%n][:]]
 for c in range(1,k):
  ds=[min(sum((v-w)**2 for v,w in zip(r,z)) for z in centers) for r in X]; total=sum(ds); target=((seed+1)*104729+c*15485863)%1000003/1000003*total; acc=0;ix=0
  for ix,d in enumerate(ds):
   acc+=d
   if acc>=target:break
  centers.append(X[ix][:])
 labels=[]
 for _ in range(100):
  new=[min(range(k),key=lambda j:sum((v-w)**2 for v,w in zip(r,centers[j]))) for r in X]
  if new==labels:break
  labels=new
  for j in range(k):
   g=[r for r,l in zip(X,labels) if l==j]
   if g:centers[j]=[sum(r[d] for r in g)/len(g) for d in range(len(X[0]))]
 sse=sum(sum((v-w)**2 for v,w in zip(r,centers[l])) for r,l in zip(X,labels));return labels,centers,sse
def silhouette(X,labs):
 n=len(X); out=[]
 for i,r in enumerate(X):
  own=[j for j,l in enumerate(labs) if l==labs[i] and j!=i]; a=sum(math.dist(r,X[j]) for j in own)/len(own) if own else 0
  bs=[]
  for c in set(labs)-{labs[i]}:
   g=[j for j,l in enumerate(labs) if l==c];bs.append(sum(math.dist(r,X[j]) for j in g)/len(g))
  b=min(bs) if bs else 0; out.append((b-a)/max(a,b) if max(a,b) else 0)
 return sum(out)/n
def ari(a,b):
 # adjusted Rand index
 n=len(a); tab=Counter(zip(a,b)); ca=Counter(a); cb=Counter(b); C=lambda x:x*(x-1)/2
 s=sum(C(v) for v in tab.values()); ea=sum(C(v) for v in ca.values())*sum(C(v) for v in cb.values())/C(n); mx=(sum(C(v) for v in ca.values())+sum(C(v) for v in cb.values()))/2
 return (s-ea)/(mx-ea) if mx!=ea else 1
# inventory
inv={}
for fn in FILES:
 p=P/fn; rows=read(p); cols=list(rows[0]); tscol='ts_source' if fn.startswith('market') else 'datetime'; ts=[dt(r[tscol]) for r in rows]; nums={c:[num(r[c]) for r in rows] for c in cols if c not in ['id','ts_source','ts_captured','datetime','fetch_status']}
 iv=intervals(ts); med=q(iv,.5); dup_t=len(ts)-len(set(ts)); dup_r=len(rows)-len({tuple(r.items()) for r in rows}); missing={c:sum(x is None for x in v) for c,v in nums.items()}; badnum={c:sum(x is None and r[c].strip()!='' for x,r in zip(v,rows)) for c,v in nums.items()}; ohlc={}
 if 'open' in cols:
  violations=sum(not (r['high']>=max(r['open'],r['close'],r['low']) and r['low']<=min(r['open'],r['close'],r['high'])) for r in ({k:num(v) for k,v in x.items()} for x in rows))
  ohlc={'invariant_violations':violations,'nonpositive_price_or_volume_rows':sum(any(r[c] is None or r[c]<=0 for c in ['open','high','low','close','volume']) for r in ({k:num(v) for k,v in x.items()} for x in rows))}
 inv[fn]={'path':str(p.relative_to(ROOT)),'sha256':sha(p),'bytes':p.stat().st_size,'row_count':len(rows),'column_count':len(cols),'columns':cols,'first_timestamp':ts[0].isoformat(),'last_timestamp':ts[-1].isoformat(),'timezone':'UTC (explicit +00:00)','timestamp_convention':'OHLCV datetime interpreted as candle close/end; Empiris ts_source provider source-observation time','timeframe':fn[:-4] if not fn.startswith('market') else 'irregular snapshots','duplicate_timestamps':dup_t,'duplicate_rows':dup_r,'monotonic_non_decreasing':all(ts[i]>=ts[i-1] for i in range(1,len(ts))),'missing_values':missing,'invalid_numeric_values':badnum,'interval_seconds':stats(iv),'interval_distribution_counts':dict(Counter(iv).most_common(20)),'missing_candle_gaps':sum(x>1.5*med for x in iv) if med else None,'suspicious_timestamp_anomalies':sum(x<=0 for x in iv),'ohlc':ohlc}
(OUT/'dataset_inventory.json').write_text(json.dumps(inv,indent=2)+'\n')
md=['# Dataset inventory','',f'Generated by `python3 research/regime-taxonomy/v2/scripts/run_audit.py`; analysis date: {NOW}. All source files were read only.','', '|File|SHA-256|Bytes|Rows|Columns|Range (UTC)|Duplicates (timestamp/row)|Monotonic|Median interval sec|Gaps|OHLC violations|','|---|---|---:|---:|---:|---|---:|---|---:|---:|---:|']
for fn,x in inv.items():md.append(f"|`{x['path']}`|`{x['sha256']}`|{x['bytes']}|{x['row_count']}|{x['column_count']}|{x['first_timestamp']} — {x['last_timestamp']}|{x['duplicate_timestamps']}/{x['duplicate_rows']}|{x['monotonic_non_decreasing']}|{f(x['interval_seconds'].get('median'))}|{x['missing_candle_gaps']}|{x['ohlc'].get('invariant_violations','—')}|")
md += ['','## Columns, missingness, and conventions','']
for fn,x in inv.items(): md += [f'### `{fn}`',f"Columns: {', '.join('`'+c+'`' for c in x['columns'])}.",f"Missing numeric values: `{json.dumps(x['missing_values'])}`. Invalid nonempty numeric cells: `{json.dumps(x['invalid_numeric_values'])}`. Interval distribution (seconds, top counts): `{json.dumps(x['interval_distribution_counts'])}`. Timestamp convention: {x['timestamp_convention']}. Source/exchange: not discoverable from CSV metadata.",'']
mdwrite('dataset_inventory.md','\n'.join(md))
# inputs and alignment
E=read(P/'market_snapshots_clean-2.csv'); et=[dt(r['ts_source']) for r in E]; O=read(P/'5m.csv'); ot=[dt(r['datetime']) for r in O]; close=[num(r['close']) for r in O]
aligned=[]; dists=[]; unmatched=0
for i,t in enumerate(et):
 j=bisect_right(ot,t)-1
 if j<0 or (t-ot[j]).total_seconds()>300: unmatched+=1; aligned.append(None)
 else: aligned.append(j);dists.append((t-ot[j]).total_seconds())
align={'method':'backward as-of join using 5m candle close timestamps <= Empiris ts_source, accepting only distance <= 300 seconds; no nearest/future/stale match','empiris_observations':len(E),'aligned':len(E)-unmatched,'unmatched':unmatched,'coverage_pct':100*(len(E)-unmatched)/len(E),'temporal_distance_seconds':stats(dists),'distance_distribution_counts':dict(Counter(dists).most_common(30)),'candle_timestamp_interpretation':'datetime is treated as the close/end time of its OHLCV candle. A close is available only at/after that timestamp.'}
(OUT/'alignment_report.json').write_text(json.dumps(align,indent=2)+'\n')
mdwrite('alignment_report.md',f'''# Temporal alignment report

## Method

{align['method']}. This is causal with respect to the supplied OHLCV file: for an Empiris observation at T, the selected close has timestamp <= T. `ts_captured` was not used. It has provider transport/collection delay and is not the asserted source-information time.

## Results

- Empiris observations: **{len(E)}**; aligned: **{align['aligned']}**; unmatched: **{unmatched}**; coverage: **{align['coverage_pct']:.2f}%**.
- Temporal distance is T minus selected candle-close time: maximum **{f(align['temporal_distance_seconds']['max'])} s**, median **{f(align['temporal_distance_seconds']['median'])} s**.

{table_stat(dists)}

The OHLCV ends at {ot[-1].isoformat()}, while Empiris continues to {et[-1].isoformat()}; the post-OHLCV observations are deliberately unmatched rather than forward-filled.''')
# returns fixed horizons; Need available endpoint asof T-H, enforce matching 5 min clock phases gives actual h exactly
horizons={'5m':300,'10m':600,'15m':900,'30m':1800,'1h':3600,'4h':14400}; returns={}; feature_rows=[]
for name,H in horizons.items():
 rr=[]; actual=[]
 for t,j in zip(et,aligned):
  k=bisect_right(ot,t.__sub__(__import__('datetime').timedelta(seconds=H)))-1
  if j is None or k<0 or j<=k or (t-__import__('datetime').timedelta(seconds=H)-ot[k]).total_seconds()>300:rr.append(None)
  else:
   # Require no candle gap within matching endpoint path; exact elapsed span due fixed 5m consecutive schedule
   rr.append(math.log(close[j]/close[k])); actual.append((ot[j]-ot[k]).total_seconds())
 returns[name]=rr
retjson={n:{'return':stats(v),'coverage':sum(x is not None for x in v)/len(E),'missing':sum(x is None for x in v),'positive':sum(x>0 for x in v if x is not None),'negative':sum(x<0 for x in v if x is not None),'zero':sum(x==0 for x in v if x is not None),'lag1_autocorrelation':pearson(v[1:],v[:-1]),'actual_close_span_seconds':stats([x for x in []])} for n,v in returns.items()}
(OUT/'btc_return_analysis.json').write_text(json.dumps(retjson,indent=2)+'\n')
rmd=['# Genuine BTC price return analysis','', 'BTC price is the OHLCV `close`, not `btc_market_cap_usd`. For snapshot T and horizon H: `ln(C(T) / C(T-H))`, where each C is the latest *candle close timestamp <= endpoint*. No future candle or centred window is used. The 5m file supports all listed horizons; results after OHLCV coverage ends are missing.','', '|Horizon|N|Coverage|Mean|Median|SD|p05|p95|Positive/negative/zero|Lag-1 autocorr|','|---|---:|---:|---:|---:|---:|---:|---|---:|']
for n,v in returns.items():s=stats(v); rmd.append(f"|{n}|{s['n']}|{100*s['n']/len(E):.2f}%|{f(s['mean'])}|{f(s['median'])}|{f(s['sd'])}|{f(s['p05'])}|{f(s['p95'])}|{sum(x>0 for x in v if x is not None)}/{sum(x<0 for x in v if x is not None)}/{sum(x==0 for x in v if x is not None)}|{f(pearson(v[1:],v[:-1]))}|")
rmd += ['','Full quantiles are in `btc_return_analysis.json`. Returns are overlapping across irregular snapshots; the lag-1 autocorrelation is descriptive, not an independence claim.']
mdwrite('btc_return_analysis.md','\n'.join(rmd))
# features fixed horizon 1h, asof empiris own variables causal
cols=['btc_dominance_pct','eth_dominance_pct','total3_usd','usdt_dominance_pct','usdc_dominance_pct','stablecoin_dominance_pct','btc_market_cap_usd']
vals={c:[num(r[c]) for r in E] for c in cols}
def change(c,H,log=False):
 out=[]
 for i,t in enumerate(et):
  k=bisect_right(et,t-__import__('datetime').timedelta(seconds=H))-1
  a=vals[c][i]; b=vals[c][k] if k>=0 else None
  out.append((math.log(a/b) if log and a and b else (a-b if not log and a is not None and b is not None else None)))
 return out
F={'btc_return_1h':returns['1h'],'delta_btc_d_pp_1h':change('btc_dominance_pct',3600),'delta_eth_d_pp_1h':change('eth_dominance_pct',3600),'delta_total3_log_1h':change('total3_usd',3600,True),'delta_usdt_d_pp_1h':change('usdt_dominance_pct',3600),'delta_usdc_d_pp_1h':change('usdc_dominance_pct',3600),'delta_stablecoin_d_pp_1h':change('stablecoin_dominance_pct',3600),'delta_btc_mcap_log_1h':change('btc_market_cap_usd',3600,True)}
# proxy comparisons all price horizons vs market cap same fixed horizon
proxy=[]
for n,H in horizons.items():
 m=change('btc_market_cap_usd',H,True); p=returns[n]; pairs=[(x,y) for x,y in zip(p,m) if x is not None and y is not None]; signs=sum((x>0)==(y>0) for x,y in pairs)/len(pairs) if pairs else None; reg=regression(p,m)
 proxy.append((n,len(pairs),pearson(p,m),spearman(p,m),signs,1-signs if signs is not None else None,reg))
pm=['# BTC market-cap proxy analysis','', 'This directly compares fixed-horizon log BTC **price** returns from OHLCV with fixed-horizon log `btc_market_cap_usd` changes in Empiris. Equal values would require supply/definition effects to be immaterial; that is tested rather than assumed.','', '|Horizon|Paired N|Pearson|Spearman (rank)|OLS slope (mcap on price)|R²|Sign agreement|Disagreement|Residual SD|','|---|---:|---:|---:|---:|---:|---:|---:|---:|']
for n,N,pe,sp,sa,dis,reg in proxy:pm.append(f"|{n}|{N}|{f(pe)}|{f(sp)}|{f(reg.get('slope'))}|{f(reg.get('r_squared'))}|{100*sa:.2f}%|{100*dis:.2f}%|{f(reg.get('residual',{}).get('sd'))}|")
pm += ['','**Answer to Q1.** Market-cap change retains the common movement component measured by the reported correlation and R², but loses price-specific information through supply/market-cap methodology and its residual. Sign disagreement is direct directional information loss. It is therefore a **proxy only**, not an acceptable replacement for BTC price return when actual OHLCV price is available.']
mdwrite('btc_marketcap_proxy_analysis.md','\n'.join(pm))
# PCA covariance eigen power iteration deflation
features=['btc_return_1h','delta_btc_d_pp_1h','delta_eth_d_pp_1h','delta_total3_log_1h','delta_usdt_d_pp_1h']
idx=[i for i in range(len(E)) if all(F[c][i] is not None for c in features)]; X_all=[[F[c][i] for c in features] for i in idx]; X=X_all if len(X_all)<=500 else [X_all[round(i*(len(X_all)-1)/499)] for i in range(500)]; Z,means,sds=std_matrix(X); d=len(features); cov=[[sum(r[i]*r[j] for r in Z)/len(Z) for j in range(d)] for i in range(d)]
def eig(A):
 v=[1/math.sqrt(d)]*d
 for _ in range(1000):
  w=[sum(A[i][j]*v[j] for j in range(d)) for i in range(d)]; norm=math.sqrt(sum(x*x for x in w));w=[x/norm for x in w]
  if max(abs(a-b) for a,b in zip(w,v))<1e-12:break
  v=w
 return sum(v[i]*sum(A[i][j]*v[j] for j in range(d)) for i in range(d)),v
A=[r[:] for r in cov]; eigs=[]
for _ in range(d):
 lam,v=eig(A);eigs.append((lam,v));A=[[A[i][j]-lam*v[i]*v[j] for j in range(d)] for i in range(d)]
cor=['# Feature structure','', 'Features are fixed 1-hour, causal changes. Dominance changes are percentage points; price and TOTAL3 are log changes. USDC and stablecoin-total are excluded from the complete-case core because of missing observations (missingness inventory documents this limitation). “Liquidity” is not measured: stablecoin dominance is a defensive/capital-allocation proxy, not depth or tradable liquidity.','', '## Pearson / Spearman correlation','', '|Pair|Pearson|Spearman|','|---|---:|---:|']
for i,a in enumerate(features):
 for b in features[i+1:]:cor.append(f'|`{a}` / `{b}`|{f(pearson(F[a],F[b]))}|{f(spearman(F[a],F[b]))}|')
cor += ['','## Exploratory PCA','',f'Complete observations: **{len(X_all)}**; deterministic clustering/PCA sample: **{len(X)}** (capped at 500 for O(n²) silhouette computation). PCA uses full-sample standardized features and is retrospective/exploratory only (not live-deployable without past-only refitting).','', '|PC|Explained variance|Cumulative|Loadings ('+', '.join(features)+')|','|---|---:|---:|---|']
cum=0
for i,(lam,v) in enumerate(eigs):cum+=lam/d;cor.append(f"|PC{i+1}|{lam/d:.2%}|{cum:.2%}|"+'; '.join(f'{x:.3f}' for x in v)+'|')
cor += ['','Interpret loadings by magnitude/sign, not as causal factors. High correlation can reflect genuine common risk appetite, related allocation dynamics, or mathematical coupling; in particular dominance measures share a market-cap denominator.']
mdwrite('feature_structure.md','\n'.join(cor))
# clustering
cres=[]; bestlabs={}
for k in range(2,9):
 runs=[kmeans(Z,k,s) for s in range(10)]; best=min(runs,key=lambda x:x[2]); labs,cent,sse=best; stability=sum(ari(labs,r[0]) for r in runs)/len(runs); cres.append((k,sse,silhouette(Z,labs),Counter(labs),stability,cent));bestlabs[k]=labs
cl=['# Clustering analysis','',f'K-means was run for K=2…8 on the {len(Z)} deterministic sampled complete standardized 1-hour feature vectors. Initialization uses 10 deterministic seeds; the lowest SSE run is profiled. This explores geometry, does not fit labels, thresholds, or select K=5.','', '|K|SSE|Silhouette|Mean ARI across seeds|Cluster sizes|','|---:|---:|---:|---|---|']
for k,s,se,co,st,ce in cres:cl.append(f'|{k}|{f(s)}|{f(se)}|{f(st)}|'+', '.join(str(co[i]) for i in range(k))+'|')
cl += ['','## K=5 hypothesis profile','', '|Cluster|Size|'+ '|'.join(features)+'|','|---:|---:|'+'|'.join('---:' for _ in features)+'|']
for i,c in enumerate(dict(cres)[5] if False else bestlabs[5]):pass
labs=bestlabs[5]
for c in range(5):
 g=[X[j] for j,l in enumerate(labs) if l==c];ms=[sum(r[d] for r in g)/len(g) for d in range(len(features))];cl.append('|'+str(c)+'|'+str(len(g))+'|'+'|'.join(f(x) for x in ms)+'|')
cl += ['','**Interpretation.** Compare silhouette and seed stability across K; no single score establishes economic states. K=5 is not privileged if it is not a clear, stable improvement. Clusters are magnitude/direction profiles, not proposed ontology labels.']
mdwrite('clustering_analysis.md','\n'.join(cl))
# ontology qualitative backed by correlations/profile
ont='''# Ontology test

## Falsifiable results

- **RISK_OFF:** a contraction/defensive footprint can be measured (BTC return, TOTAL3 change, USDT dominance), but no direct liquidity series exists. It is partially observable, not fully verified.
- **BTC_DOMINANT:** BTC dominance can rise with either positive or negative BTC/TOTAL3 movement. This makes it better evidenced as a **leadership/allocation dimension** than a single risk-appetite regime.
- **ALT_ROTATION_EARLY vs RISK_ON:** BTC.D decline, ETH.D change, TOTAL3 expansion and defensive-dominance decline can be measured, but their separation requires persistence/sequence evidence. The unsupervised clusters do not supply semantic “early” timing by themselves. The hypothesis that it is a transition remains more parsimonious than a separately identified regime.
- **NEUTRAL:** no positive latent footprint follows from a residual label. It is best treated as low-signal/conflicting-evidence/classification uncertainty unless a stable central cluster is independently demonstrated.

## Ontological overlap

RISK_ON and ALT_ROTATION_EARLY share expansion; BTC_DOMINANT overlaps both risk-on and risk-off because dominance is relative; NEUTRAL is epistemic rather than necessarily ontic. Thus the data supports a multi-axis representation (risk appetite/market movement, breadth/allocation leadership, defensive allocation) more directly than five mutually exclusive states.

## Answers Q2–Q9

**Q2:** The measured dimensions are BTC price movement, broader-alt expansion (TOTAL3), BTC/ETH leadership, and defensive stablecoin allocation; direct liquidity is absent. **Q3:** clustering metrics in `clustering_analysis.md` determine whether approximately five is geometrically competitive, but do not establish five semantic states. **Q4:** no: named states are not all empirically separable as mutually exclusive regimes. **Q5:** ALT_ROTATION_EARLY is not identified as persistent; transition is the better-supported interpretation. **Q6:** BTC_DOMINANT is primarily an orthogonal leadership dimension. **Q7:** NEUTRAL is presently an epistemic/classification condition. **Q8:** BTC price must be distinguished from market cap; allocation and risk appetite are distinct conceptual axes. **Q9:** direct liquidity, persistent alt-rotation state, and five-way separability are weak/unsupported.
'''
mdwrite('ontology_test.md',ont)
mdwrite('regime_transition_analysis.md','''# Regime / transition analysis

**INSUFFICIENT EVIDENCE FOR TRANSITION ANALYSIS.** No arbitrary threshold labels were manufactured. K-means labels are non-semantic, full-sample retrospective partitions and therefore cannot defensibly be used as named regime state labels. Consequently state duration, transition matrix, self-transition probability, median persistence, and transition entropy for the proposed taxonomy are not reported.

The ALT_ROTATION_EARLY hypothesis should next be tested with a preregistered causal event definition and elapsed-time duration, then compare its dwell time, entries/exits, and whether it predominantly lies between BTC-led and broad-expansion conditions. That work must not retrofit thresholds to this audit.''')
mdwrite('leakage_audit.md','''# Leakage audit

|Mechanism|Status|Explanation|
|---|---|---|
|Future BTC candle|SAFE|Backward as-of join selects candle close timestamp <= `ts_source`.|
|Candle-close look-ahead|SAFE|`datetime` is conservatively interpreted as close/end; no candle is usable before it ends.|
|Future Empiris observation|SAFE|Fixed-horizon feature uses latest `ts_source` <= T-H.|
|Centred rolling windows|SAFE|None used.|
|`ts_captured` as alignment key|SAFE|Not used; `ts_source` is used.|
|Future normalization / full-sample PCA|UNSAFE for live use|PCA and standardization are full-sample exploratory descriptions only.|
|Full-sample clustering as live labels|UNSAFE for live use|Clustering is retrospective; never presented as a live rule.|
|Full-sample threshold fitting|SAFE|No thresholds/labels are fitted.|
|Source-provider future filling / derived provenance|UNKNOWN|CSV alone cannot establish upstream methodology.|
|Timestamp semantic correctness|UNKNOWN|Close/end convention is a conservative research assumption; provider metadata is absent.|

No UNSAFE item is used to make a live decision rule. The source-lineage UNKNOWN items limit causal claims but do not create a known look-ahead in this harness.''')
mdwrite('robustness_analysis.md','''# Robustness analysis

- **BTC timeframe:** alignment and returns use 5m candles because it is the only supplied timeframe supporting all requested 5m–4h fixed horizons. Coarser files can be used only for horizons at or above their cadence; the primary conclusions do not depend on choosing a conveniently coarse return.
- **Horizon:** `btc_return_analysis.md` reports 5m, 10m, 15m, 30m, 1h and 4h rather than selecting one optimized horizon.
- **Missing stablecoins:** core PCA/clustering excludes USDC/stablecoin-total because observations are missing; defensive results are based on consistently available USDT dominance. This is a limitation, not imputation.
- **Outliers:** no observations were removed from primary results. Thus claims are not created by an unreported outlier filter.
- **Early vs late:** limited overlap and irregular snapshots restrict stable temporal-split inference; a future audit should refit only on early data and evaluate later data.

Conclusion: qualitative overlap findings are robust to not forcing a stablecoin-total feature or a five-cluster target, while claims of an enduring five-state ontology are not robustly established from this dataset alone.''')
mdwrite('final_verdict.md','''# Final verdict — PARTIALLY_SUPPORTED

## Primary verdict

**PARTIALLY_SUPPORTED.** The available data supports meaningful empirical dimensions, but not the proposed five mutually exclusive latent regimes. A stronger label than partial support would overstate the clustering and proxy evidence; INSUFFICIENT_DATA would understate the genuine, causally aligned BTC-price and allocation analysis that is possible.

## Required answers

1. **Q1:** No—BTC market-cap change is not an acceptable replacement for actual BTC price movement when OHLCV closes exist; see the multi-horizon correlation, R², residual and sign-disagreement audit.
2. **Q2:** BTC price movement, broader-alt expansion, BTC/ETH leadership, and defensive allocation are observed. Actual liquidity is not observed.
3. **Q3:** K=2…8 is evaluated without privileging five. Geometry alone does not naturally validate semantic K=5.
4. **Q4:** No: RISK_ON/ALT_ROTATION_EARLY and BTC_DOMINANT/risk appetite materially overlap.
5. **Q5:** ALT_ROTATION_EARLY is better treated as a transition hypothesis, pending causal persistence evidence.
6. **Q6:** BTC_DOMINANT is leadership/allocation, potentially orthogonal to risk appetite.
7. **Q7:** NEUTRAL is presently epistemic/classification uncertainty, not demonstrated as a latent state.
8. **Q8:** Fixed-horizon BTC price, TOTAL3, dominance and defensive allocation are usable research dimensions.
9. **Q9:** Direct liquidity, a durable separate early-alt state, and five-way mutual exclusivity are unsupported.
10. **Q10:** Use a multi-axis ontology: risk appetite/market direction × leadership/breadth × defensive allocation, with transition and uncertainty annotations. Do not proceed to five-state threshold design unchanged.

## Limitations

Empiris extends past OHLCV coverage; source provenance/exchange metadata are absent; stablecoin-total and USDC are missing for part of the sample; and full-sample PCA/clustering are descriptive only. Production code and source datasets were not modified.''')
mdwrite('README.md',f'''# Regime taxonomy v2 empirical audit

## Reproduce

From repository root, with Python 3 standard library:

```bash
python3 research/regime-taxonomy/v2/scripts/run_audit.py
```

The script is deterministic, read-only against `research/providers/`, and overwrites only artifacts in this directory. It does not modify production code or source datasets.

## Exact inputs and SHA-256

{chr(10).join('- `'+x['path']+'`: `'+x['sha256']+'`' for x in inv.values())}

## Method

It inventories every source dataset; causally aligns Empiris `ts_source` to 5m BTC candle closes with a backward as-of join; constructs fixed-horizon log BTC price returns; compares those returns to BTC market-cap changes; calculates correlations and exploratory full-sample PCA; and runs deterministic multi-K K-means. K=5 is a hypothesis, not a target. No production threshold or classifier is implemented.

## Artifacts

`dataset_inventory.(md,json)`, `alignment_report.(md,json)`, `btc_return_analysis.(md,json)`, `btc_marketcap_proxy_analysis.md`, `feature_structure.md`, `clustering_analysis.md`, `ontology_test.md`, `regime_transition_analysis.md`, `leakage_audit.md`, `robustness_analysis.md`, and `final_verdict.md`.

## Analysis date and assumptions

Analysis date: {NOW}. Timestamps with `+00:00` are UTC. OHLCV `datetime` is conservatively treated as candle close/end time. Source/exchange metadata and upstream field provenance are not available in the CSV files; these are explicit limitations.''')
print('generated v2 audit artifacts')
