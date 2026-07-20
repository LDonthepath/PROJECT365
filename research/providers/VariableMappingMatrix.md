# PROJECT365 — Variable Mapping Matrix

Version: 1.0

Status: Draft

---

## Purpose

This document is the Single Source of Truth that connects the three provider variable documentation layers:

Raw Variables → Canonical Variables → Derived Metrics

It maps existing raw provider variables from `RawVariableCatalog.md` to existing canonical variables from `CanonicalVariableDictionary.md`, and then to existing derived metrics from `DerivedMetricsCatalog.md` where those canonical variables are used as metric inputs.

---

## Scope

This document defines relationships between Raw Variables, Canonical Variables, and Derived Metrics only. It does not redefine any variable, metric, provider field, calculation, formula, threshold, or data quality status.

Authoritative definitions remain in:

- `RawVariableCatalog.md`
- `CanonicalVariableDictionary.md`
- `DerivedMetricsCatalog.md`

---

## Architecture Flow

```text
Master Provider Research
        │
        ▼
Raw Variable Catalog
        │
        ▼
Canonical Variable Dictionary
        │
        ▼
Variable Mapping Matrix
        │
        ▼
Derived Metrics Catalog
```

This document connects the documentation layers without replacing them; it records how existing raw inputs align to canonical variables and how those canonical variables support existing derived metrics.

---

## Status Legend

- `Used`: The canonical variable currently supports one or more derived metrics.
- `Reserved`: The canonical variable is retained for documentation completeness or future use but is not currently tied to a derived metric.
- `Future Metric`: The canonical variable is retained for roadmap planning and potential future derived metrics.

---

## Mapping Rules

- Mapping relationships are documentation only.
- Mapping does not define calculation ownership.
- Raw Variable ID(s), Canonical Variable ID, and Derived Metric ID(s) must reference existing IDs only.
- Multiple provider-specific Raw Variables may map to one Canonical Variable.
- One Canonical Variable may support multiple Derived Metrics.
- Many-to-one mappings are represented by multiple Raw Variable IDs in the same row.
- One-to-many mappings are represented by multiple Derived Metric IDs in the same row.
- Reserved Canonical Variables are intentionally retained.
- Future Metric status represents roadmap planning only.
- `None` means the canonical variable currently has no mapped raw variable or no mapped derived metric in the existing catalogs.

---

## Variable Mapping Matrix

| Mapping ID | Raw Variable ID(s) | Canonical Variable ID | Derived Metric ID(s) | Mapping Type | Status | Notes |
|---|---|---|---|---|---|---|
| VM-001 | RV-001 | CV-001 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-002 | RV-002; RV-023 | CV-002 | None | Many-to-one raw to canonical; no derived metric | Reserved | Multi-provider normalization; provider-specific variant. |
| VM-003 | RV-003 | CV-003 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-004 | RV-004; RV-024 | CV-004 | None | Many-to-one raw to canonical; no derived metric | Reserved | Multi-provider normalization; provider-specific variant. |
| VM-005 | RV-005 | CV-005 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-006 | RV-006 | CV-006 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-007 | RV-007 | CV-007 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-008 | RV-008 | CV-008 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-009 | RV-009 | CV-009 | DM-001; DM-002 | One-to-one raw to canonical; one-to-many canonical to derived metrics | Used | Supports exchange flow metrics. |
| VM-010 | RV-010 | CV-010 | DM-001; DM-002 | One-to-one raw to canonical; one-to-many canonical to derived metrics | Used | Supports exchange flow metrics. |
| VM-011 | RV-011 | CV-011 | None | One-to-one raw to canonical; no derived metric | Reserved | Direct provider field; derived metrics use inflow and outflow. |
| VM-012 | RV-012 | CV-012 | DM-002 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports exchange reserve flow metric. |
| VM-013 | RV-013 | CV-013 | DM-004 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports macro liquidity metric. |
| VM-014 | RV-014 | CV-014 | DM-004 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports macro liquidity metric. |
| VM-015 | RV-015 | CV-015 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-016 | RV-016 | CV-016 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-017 | RV-017 | CV-017 | DM-003 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports yield curve metric. |
| VM-018 | RV-018 | CV-018 | DM-003 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports yield curve metric. |
| VM-019 | RV-019 | CV-019 | DM-006 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports network activity metric. |
| VM-020 | RV-020 | CV-020 | DM-006; DM-007 | One-to-one raw to canonical; one-to-many canonical to derived metrics | Used | Supports multiple network density metrics. |
| VM-021 | RV-021 | CV-021 | DM-007; DM-011 | One-to-one raw to canonical; one-to-many canonical to derived metrics | Used | Supports network transaction and token transfer metrics. |
| VM-022 | RV-022 | CV-022 | None | One-to-one raw to canonical; no derived metric | Future Metric | Research-stage variable; reserved for future metrics. |
| VM-023 | RV-025 | CV-023 | DM-008 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports ETH staking participation metric. |
| VM-024 | RV-026 | CV-024 | DM-008 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports ETH staking participation metric. |
| VM-025 | RV-027 | CV-025 | None | One-to-one raw to canonical; no derived metric | Reserved | Direct provider field; reserved for future metrics. |
| VM-026 | RV-028 | CV-026 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-027 | RV-029 | CV-027 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-028 | RV-030 | CV-028 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-029 | RV-031; RV-033; RV-035 | CV-029 | DM-009 | Many-to-one raw to canonical; one-to-one canonical to derived metric | Used | Multi-provider normalization; per-exchange variable. |
| VM-030 | RV-032; RV-034; RV-036 | CV-030 | DM-009 | Many-to-one raw to canonical; one-to-one canonical to derived metric | Used | Multi-provider normalization; per-exchange variable. |
| VM-031 | RV-037 | CV-031 | None | One-to-one raw to canonical; no derived metric | Future Metric | Research-stage variable. |
| VM-032 | RV-038 | CV-032 | None | One-to-one raw to canonical; no derived metric | Future Metric | Research-stage variable. |
| VM-033 | RV-039 | CV-033 | None | One-to-one raw to canonical; no derived metric | Future Metric | Research-stage variable. |
| VM-034 | RV-040 | CV-034 | None | One-to-one raw to canonical; no derived metric | Future Metric | Research-stage variable. |
| VM-035 | RV-041 | CV-035 | None | One-to-one raw to canonical; no derived metric | Reserved | Reserved for future metrics. |
| VM-036 | RV-042 | CV-036 | DM-005 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports market size ratio metric. |
| VM-037 | RV-043 | CV-037 | DM-005; DM-010 | One-to-one raw to canonical; one-to-many canonical to derived metrics | Used | Supports multiple liquidity metrics. |
| VM-038 | RV-044 | CV-038 | DM-010 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports DEX volume share metric. |
| VM-039 | RV-045 | CV-039 | DM-011 | One-to-one raw to canonical; one-to-one canonical to derived metric | Used | Supports token transfer ratio metric. |
