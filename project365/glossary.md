# PROJECT365 Glossary

## 1. Document Information

- **Status:** Active
- **Version:** 1.2
- **Owner:** PROJECT365 Product
- **Last Updated:** 2026-07-14
- **Depends On:** [BRD](../business/brd.md), [PRD](../business/prd.md), [Architecture](../architecture/architecture.md), [Product Map](../architecture/product-map.md)
- **Referenced By:** BRD, PRD, Architecture, Product Map, Technical Design documents, Issue Specifications, Acceptance Criteria, Implementation Prompts

## 2. Purpose

This glossary is the authoritative terminology reference for PROJECT365.

It defines one preferred name and one meaning for each approved term used across the BRD, PRD, Architecture, and Product Map. It normalizes terminology, lists deprecated synonyms, and prevents ambiguous or conflicting definitions without introducing new concepts or changing the approved architecture.

## 3. Naming Rules

- Use exactly one preferred name for each concept.
- Use each preferred name with exactly one meaning.
- Use domain names with the `Domain` suffix when referring to product domains.
- Use module names exactly as listed in the Product Map and Architecture.
- Use `Engine` only for modules that calculate, analyze, assess, or produce intelligence or recommendations.
- Use `Service` only for operational process coordination.
- Use `Layer` only for architecture abstractions or approved module names that include `Layer`.
- Use `Framework` only for collections of components that operate under an approved methodology.
- Use `Contract` only for formal data structure and rule definitions.
- Use `MarketData` as a single compound term for the immutable market data representation.
- Use `Snapshot` for immutable market state at a specific reference time.
- Use `Delta` for the difference between two snapshots or between a closed snapshot and live market state.
- Use `Exposure Engine` for the module and `exposure recommendation` for its output.
- Do not use deprecated synonyms except when explicitly documenting deprecated terminology.
- Do not use abbreviations unless they are listed in Section 9.

## 4. Core Terms

| Preferred Term | Definition | Deprecated Synonyms |
| --- | --- | --- |
| PROJECT365 | The approved product name for the Adaptive Crypto Market Intelligence Platform. | Project 365, Project365 |
| Adaptive Crypto Market Intelligence Platform | The approved product positioning for PROJECT365 as a platform that transforms raw crypto market data into explainable market intelligence and portfolio exposure recommendations. | Crypto intelligence app, trading platform |
| Market Intelligence Platform | A product positioning that describes PROJECT365 as a system for understanding market conditions. | Signal tool, indicator dashboard |
| Decision Support System | A product positioning that describes PROJECT365 as a system that supports user decisions without executing trades or providing financial advice. | Trading bot, auto trading platform, financial advisor |
| Explainable Analytics Platform | A product positioning that describes PROJECT365 as a system that explains why conclusions and recommendations exist. | Black-box signal platform |
| Raw Crypto Market Data | Unprocessed crypto market data before Foundation validation and structuring. | Raw data, market feed |
| Market Intelligence | Explainable understanding of global market conditions derived from trusted market data. | Market analysis, market signal |
| Portfolio Intelligence | Explainable portfolio-level decision intelligence derived from Market Intelligence. | Portfolio signal, allocation signal |
| Market Condition | The current or historical state of the market as understood through approved intelligence outputs. | Market situation |
| Market State | An assessed representation of market conditions. | State, condition score |
| User Decision Support | Information presented to users to support decisions without executing trades, guaranteeing profits, predicting prices, or providing financial advice. | Trade instruction, financial advice |
| Exposure Recommendation | An explainable recommendation about portfolio exposure produced by Portfolio Intelligence and governed for explainability and auditability. | Exposure Management, allocation signal |
| Current Release Scope | The approved current scope: Foundation v0.1, limited to MarketData Contract, Health Layer, and Snapshot Engine. | Current focus, current implementation scope |
| Foundation v0.1 | The current Foundation release scope containing MarketData Contract, Health Layer, and Snapshot Engine. | Foundation Edition when referring to current scope |

## 5. Architecture Terms

| Preferred Term | Definition | Deprecated Synonyms |
| --- | --- | --- |
| Domain | A high-level business or product area that groups related capabilities and modules. | Area, layer when used as a domain substitute |
| Foundation Domain | The domain that provides trusted, immutable, and validated market data. | Foundation Layer when referring to the domain |
| Market Intelligence Domain | The domain that understands global market conditions. | Intelligence Layer when referring to the domain |
| Portfolio Intelligence Domain | The domain that transforms market intelligence into actionable exposure decisions. | Portfolio Layer when referring to the domain |
| Governance Domain | The domain that ensures explainability and auditability. | Governance Layer when referring to the domain |
| Presentation Domain | The domain that presents intelligence to users. | UI Layer, frontend layer when referring to the domain |
| Module | A self-contained functional component inside a domain. | Component when referring to Product Map module names |
| Layer | An architectural abstraction in the approved architecture sequence. | Tier |
| Engine | A module that performs approved calculations, analysis, assessment, or recommendation generation. | Calculator, scorer |
| Service | A component responsible for operational process coordination. | Manager, worker |
| Contract | A formal definition of data structure and rules. | Schema when used as the full concept |
| Framework | A collection of approved components that work together under one methodology. | System when used as the full concept |
| Provider Framework | The Foundation architecture framework for coordinating external data providers through approved provider contracts, registry behavior, adapters, normalization, attribution, metadata, and error handling. | Provider system, external data framework |
| Modular Architecture | The approved architecture principle that components remain separated by clear responsibilities and dependency rules. | Modular Design |
| Regime First | The principle that market regime is a primary upstream constraint for downstream decisions. | Regime-led |
| Hard Gate Principle | The principle that a higher-level decision can restrict lower-level decisions. | Gate, hard stop |
| Single Source of Truth | The principle that one approved owner controls a particular state or data responsibility. | SSOT when not defined |
| Separation of Concerns | The principle that each domain, module, and layer has one clear responsibility. | Responsibility split |
| Lower Layers | Earlier layers in the approved dependency sequence: Foundation, then Market Intelligence, then Portfolio Intelligence, then Governance, then Presentation. | Upstream layers when ambiguous |
| Higher Layers | Later layers in the approved dependency sequence. | Downstream layers when ambiguous |

## 6. Business Terms

| Preferred Term | Definition | Deprecated Synonyms |
| --- | --- | --- |
| Business Requirement | A BRD-defined statement of why the product exists or what business outcome it must support. | Business need when used as a formal requirement |
| Business Capability | A BRD-approved capability PROJECT365 must support. | Capability when ambiguous |
| Business Constraint | A BRD-approved limit or rule that constrains product and architecture decisions. | Constraint when ambiguous |
| Business Acceptance Criteria | BRD-defined acceptance criteria for business-level validation. | BAC when not defined |
| Target User | A BRD-defined user type for PROJECT365. | Persona when ambiguous |
| Crypto Investor | A target user who uses PROJECT365 to understand market conditions and reduce emotional decisions. | Investor |
| Active Trader | A target user who uses PROJECT365 to understand regime shifts and improve risk management. | Trader |
| Portfolio Manager | A target user who uses PROJECT365 to manage exposure and allocate capital effectively. | Manager |
| Researcher | A target user who uses PROJECT365 to study market behavior and analyze historical patterns. | Analyst |
| Explainability | The ability to explain why a conclusion, recommendation, or decision-support output exists. | Explanation, rationale when ambiguous |
| Auditability | The ability to reproduce and inspect historical decisions, outputs, and market states. | Audit trail when used as full concept |
| Historical Reproducibility | The ability to reproduce historical analysis from immutable snapshots, records, and versions. | Reproducibility when ambiguous |
| User Trust | User confidence that outputs are stable, explainable, auditable, and correctly positioned as decision support. | Trust |
| Financial Advice | Personalized advice about financial decisions; PROJECT365 must not provide this. | Investment advice |
| Trade Execution | Automated or manual execution of market orders; PROJECT365 must not perform this. | Trading, auto trading |
| Price Prediction | Predicting future asset prices; PROJECT365 must not position itself as doing this. | Forecasting prices |
| Profit Guarantee | Any promise of profits; PROJECT365 must not provide this. | Guaranteed return |

## 7. Technical Terms

| Preferred Term | Definition | Deprecated Synonyms |
| --- | --- | --- |
| MarketData | Immutable representation of market data from a single fetch and the Single Source of Truth for downstream systems. | Market Data when referring to the contract object |
| MarketData Contract | The formal structure and rules for MarketData. | Market Data Contract |
| External Data Source | A third-party or external system that supplies raw crypto market data before PROJECT365 validation, normalization, and MarketData creation. | External feed, third-party feed when ambiguous |
| Provider | An approved representation of an external data source inside the Provider Framework. | Data provider when ambiguous, source when ambiguous |
| Provider Result | The structured output returned by a Provider Adapter before it is normalized into approved Foundation data structures. | Adapter result, provider response when ambiguous |
| Provider Error | A structured error produced by a Provider Adapter or Provider Framework component when an external data source cannot be fetched, interpreted, validated, or normalized. | Adapter error, fetch error when ambiguous |
| Provider Metadata | Structured context about a provider fetch, including provider identity, timing, source details, and other approved traceability fields needed for auditability. | Fetch metadata, source metadata when ambiguous |
| Normalization | The process of converting provider-specific data into approved PROJECT365 structures and terminology without changing the meaning of the source data. | Mapping when used as the full concept, transformation when ambiguous |
| Source Attribution | Traceable identification of the external data source and provider context used to create or support a data object, snapshot, or downstream output. | Attribution when ambiguous, data provenance when used inconsistently |
| Provider Registry | The Provider Framework component or pattern that records approved providers and controls how they are discovered or selected by Foundation ingestion processes. | Registry when ambiguous, provider list when used as the full concept |
| Provider Adapter | An implementation component that translates between a specific external data source and the approved Provider Framework contracts. | Adapter when ambiguous, data adapter when ambiguous |
| Snapshot | Immutable representation of market state at a specific reference time. | Market snapshot when ambiguous |
| Snapshot Engine | The Foundation module that creates immutable snapshots for reproducible historical analysis. | Snapshot Service |
| Anchor | A special snapshot representing an important market boundary. | Boundary snapshot |
| Daily Anchor | An Anchor for a daily market boundary. | D1 Anchor |
| Weekly Anchor | An Anchor for a weekly market boundary. | W1 Anchor |
| Monthly Anchor | An Anchor for a monthly market boundary. | M1 Anchor when ambiguous with minute notation |
| M5 Anchor | An Anchor for a five-minute market boundary. | Five-minute anchor |
| H1 Anchor | An Anchor for an hourly market boundary. | One-hour anchor |
| Delta | The difference between two snapshots or between a closed snapshot and live market state. | Change, difference when ambiguous |
| Delta Engine | The Market Intelligence module that calculates market deltas from snapshots. | Delta Layer |
| Data Service | The Foundation module that coordinates ingestion of global market data. | Ingestion service |
| Health Layer | The Foundation module that validates market data health and supports snapshot readiness. | Health Engine |
| Event Bus | The Foundation module that publishes approved domain events between components. | Event system |
| Storage Layer | The Foundation module that persists trusted market data and immutable snapshots. | Storage |
| Triad Liquidity Framework | The Market Intelligence framework that supports liquidity analysis as part of global market condition assessment. | Triad, Liquidity Framework |
| Regime | The dominant market environment. | Market regime when not used consistently |
| Regime Engine | The Market Intelligence module that determines market regime. | Regime classifier |
| LDS Engine | The Market Intelligence module that detects liquidity divergence. | Liquidity Divergence System when referring to the module |
| Capital Flow Engine | The Market Intelligence module that assesses capital flow conditions. | Flow Engine |
| Market State Engine | The Market Intelligence module that assesses overall market state. | State Engine |
| Confidence Engine | The Market Intelligence module that communicates reliability of market assessments. | Confidence score engine |
| OMS Engine | The Market Intelligence module that aggregates approved market intelligence into an overall market assessment. | Overall Market Score when referring to the module |
| Exposure Engine | The Portfolio Intelligence module that generates explainable exposure recommendations. | Exposure Management |
| Portfolio Engine | The Portfolio Intelligence module that supports portfolio-level decision intelligence. | Portfolio Layer |
| Risk Engine | The Portfolio Intelligence module that supports risk management and risk budgeting decisions. | Risk module |
| Cluster Rotation Engine | The Portfolio Intelligence module that supports cluster rotation analysis and recommendations. | Cluster Rotation |
| Decision Log | The Governance module that records decision-support outputs for auditability. | Decision record |
| Validation Framework | The Governance module that validates outputs against approved rules and acceptance criteria. | Validation system |
| Champion-Challenger | The Governance module that supports comparison of approved model versions. | Champion Challenger |
| Model Versioning | The Governance module that tracks model and rule versions for reproducibility. | Versioning |
| Rollback Framework | The Governance module that supports rollback to approved model or rule versions. | Rollback system |
| Dashboard | The Presentation module that displays decision-focused market intelligence. | Home screen |
| Inspector | The Presentation module that allows users to inspect market conclusions. | Inspection view |
| Historical Explorer | The Presentation module that provides historical exploration of market states. | History explorer |
| Settings | The Presentation module that provides user-facing configuration controls. | Configuration |
| Domain Event | An approved event published between components while preserving dependency direction. | Event when ambiguous |
| Decision-Support Output | An output used to support user decisions without providing financial advice or executing trades. | Recommendation when ambiguous |
| Specification Driven Development | The delivery approach in which implementation remains traceable to approved specifications. | Spec-driven development, SDD when not defined |
| Documentation-First Workflow | The delivery approach in which approved documentation context is preserved before implementation. | Docs-first workflow |
| Technical Design | A document that defines how an approved component should be implemented. | TD when not defined |
| Issue Specification | A small, implementable unit of work derived from approved requirements and technical design. | Issue when ambiguous |
| Acceptance Criteria | Conditions used to validate whether an implementation or document satisfies approved requirements. | AC when not defined |
| Implementation Prompt | A prompt used to guide implementation from approved specifications. | Prompt when ambiguous |
| Freeze | A stable document or design state that should not change without formal review. | Frozen state |

## 8. Forbidden / Deprecated Terms

| Term | Status | Use Instead | Reason |
| --- | --- | --- | --- |
| Trading bot | Forbidden | Decision Support System | PROJECT365 does not execute trades. |
| Auto trading platform | Forbidden | Decision Support System | PROJECT365 does not execute trades. |
| Price prediction system | Forbidden | Market Intelligence Platform | PROJECT365 does not predict prices. |
| Financial advisor | Forbidden | Decision Support System | PROJECT365 does not provide financial advice. |
| Profit guarantee | Forbidden | User Decision Support | PROJECT365 does not guarantee profits. |
| Modular Design | Deprecated | Modular Architecture | BRD, PRD, Architecture, and Product Map use Modular Architecture as the preferred principle. |
| Storage | Deprecated | Storage Layer | Product Map and Architecture use Storage Layer as the approved Foundation module name. |
| Market Data Contract | Deprecated | MarketData Contract | MarketData is the approved compound term for the immutable representation and contract name. |
| Snapshot Service | Deprecated | Snapshot Engine | Snapshot Engine is the approved Foundation module name. |
| Anchor Service | Deprecated | Anchor or approved future anchor lifecycle terminology in downstream delivery docs | Anchor is a glossary term; no approved Product Map module named Anchor Service exists. |
| Exposure Management | Deprecated | Exposure Engine or exposure recommendation | Exposure Engine is the approved module; exposure recommendation is the approved output. |
| Intelligence Layer | Deprecated when referring to a domain | Market Intelligence Domain | Product domains must use approved domain names. |
| Portfolio Layer | Deprecated when referring to a domain | Portfolio Intelligence Domain | Product domains must use approved domain names. |
| UI Layer | Deprecated when referring to a domain | Presentation Domain | Product domains must use approved domain names. |
| CoinGecko Adapter | Implementation terminology | Provider Adapter when referring to the implementation component; Data Service if referring to approved product scope | CoinGecko Adapter is implementation terminology, not an approved BRD, PRD, Architecture, or Product Map product module. |
| Snapshot Cache | Delivery-only term | Snapshot Engine or Storage Layer if referring to approved product scope | Not approved as a BRD, PRD, Architecture, or Product Map product module. |
| API Layer | Delivery-only term | Presentation Domain or approved future technical design terminology | Not approved as a BRD, PRD, Architecture, or Product Map product module. |
| Authentication | Delivery-only term | Settings only when referring to approved Presentation module scope | Not approved as a BRD, PRD, Architecture, or Product Map product module. |
| AI Meta | Deprecated roadmap term | Approved Governance modules or future approved documentation update | Not listed as an approved Product Map module. |

## 9. Abbreviations

| Abbreviation | Meaning | Usage Rule |
| --- | --- | --- |
| ADR | Architecture Decision Record | Use only for approved Architecture Decision Records. |
| API | Application Programming Interface | Use only as a technical interface term, not as an approved product module unless a future approved document defines it. |
| BAC | Business Acceptance Criteria | Define on first use outside the BRD. |
| BRD | Business Requirements Document | Refers only to `business/brd.md`. |
| FR | Functional Requirement | Use only for PRD functional requirement identifiers. |
| H1 | One-hour timeframe | Use only in approved anchor terminology such as H1 Anchor. |
| LDS | Liquidity Divergence System | Use as LDS Engine for the approved module. |
| M5 | Five-minute timeframe | Use only in approved anchor terminology such as M5 Anchor. |
| NFR | Non-Functional Requirement | Use only for PRD non-functional requirement identifiers. |
| OMS | Overall Market Score | Use as OMS Engine for the approved module. |
| PRD | Product Requirements Document | Refers only to `business/prd.md`. |
| SaaS | Software as a Service | Use only for architecture deployment readiness context. |
| TD | Technical Design | Define on first use outside formal TD identifiers. |

## 10. Traceability

| Glossary Area | Source of Truth | Normalization Result |
| --- | --- | --- |
| Product positioning | BRD §2; PRD Purpose; Architecture §2; Product Map §2 | Uses Adaptive Crypto Market Intelligence Platform, Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform. |
| Product domains | BRD §10; PRD Scope; Architecture §6; Product Map §4 | Uses Foundation Domain, Market Intelligence Domain, Portfolio Intelligence Domain, Governance Domain, and Presentation Domain. |
| Approved architecture sequence | BRD §14 and §19; PRD Constraints; Architecture §5; Product Map §8 | Preserves Foundation → Market Intelligence → Portfolio Intelligence → Governance → Presentation. |
| Architecture principles | BRD §13; PRD Business Rules; Architecture §4 | Uses Regime First, Hard Gate Principle, Single Source of Truth, Separation of Concerns, Explainability, Auditability, and Modular Architecture. |
| Foundation modules | BRD §10; PRD Scope; Architecture §6 and §8; Product Map §4 and §6 | Uses Data Service, MarketData Contract, Health Layer, Snapshot Engine, Event Bus, and Storage Layer. |
| Market Intelligence modules | BRD §10; PRD Scope; Architecture §6 and §8; Product Map §4 and §6 | Uses Delta Engine, Triad Liquidity Framework, Regime Engine, LDS Engine, Capital Flow Engine, Market State Engine, Confidence Engine, and OMS Engine. |
| Portfolio Intelligence modules | BRD §10; PRD Scope; Architecture §6 and §8; Product Map §4 and §6 | Uses Exposure Engine, Portfolio Engine, Risk Engine, and Cluster Rotation Engine. |
| Governance modules | BRD §10; PRD Scope; Architecture §6 and §8; Product Map §4 and §6 | Uses Decision Log, Validation Framework, Champion-Challenger, Model Versioning, and Rollback Framework. |
| Presentation modules | BRD §10; PRD Scope; Architecture §6 and §8; Product Map §4 and §6 | Uses Dashboard, Inspector, Explainability, Historical Explorer, and Settings. |
| Current release scope | BRD §10; PRD Scope; Architecture §3; Product Map §10 | Uses Foundation v0.1 limited to MarketData Contract, Health Layer, and Snapshot Engine. |
| Out of scope terms | BRD §11; PRD Out of Scope; Architecture §16; Product Map §12 | Forbids trading bot, auto trading platform, price prediction system, financial advisor, trade execution, profit guarantee, and financial advice positioning. |
| Delivery terminology boundaries | PRD Product Roadmap; Product Map module list | Marks delivery-only terms as non-authoritative for product module naming. |

## 11. References

- [BRD](../business/brd.md)
- [PRD](../business/prd.md)
- [Architecture](../architecture/architecture.md)
- [Product Map](../architecture/product-map.md)
- [Architecture Decision Records](../architecture/decisions.md)
- [Backlog](../implementation/backlog.md)
- [Roadmap](./roadmap.md)
- [Current Status](../implementation/current-status.md)

## 12. Change History

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-13 | Initial glossary draft. |
| 1.1 | 2026-07-13 | Normalized glossary to the required template; established one preferred term and one meaning per concept; added deprecated synonyms, forbidden terms, abbreviations, traceability, and references derived from the BRD, PRD, Architecture, and Product Map without introducing new concepts or changing approved architecture. |
| 1.2 | 2026-07-14 | Added Provider Framework terminology, external provider data definitions, and clarified that CoinGecko Adapter is implementation terminology while Provider Framework is architecture terminology. |
