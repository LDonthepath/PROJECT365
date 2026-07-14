# PROJECT365

PROJECT365 is an Adaptive Crypto Market Intelligence Platform. It is documented as a Market Intelligence Platform, Decision Support System, and Explainable Analytics Platform.

PROJECT365 transforms raw crypto market data into explainable market intelligence and portfolio exposure recommendations. It is not a trading bot, auto trading platform, price prediction system, or financial advisor.

## Documentation Hierarchy

PROJECT365 follows Specification Driven Development and a documentation-first workflow. Governance documents are the source of truth for implementation work.

```text
Project Context
↓
BRD
↓
PRD
↓
Architecture
↓
Product Map
↓
Glossary and ADR
↓
Roadmap
↓
Backlog
↓
Current Status
↓
Technical Designs
↓
Issue Specifications
↓
Acceptance Criteria
↓
Implementation
↓
Review
↓
Freeze
```

## Repository Structure

| Path | Purpose |
|------|---------|
| `docs/` | Authoritative governance documents, product documents, roadmap, backlog, and current status. |
| `templates/` | Templates for Technical Designs, Issue Specifications, and Acceptance Criteria. |
| `specs/` | Technical Design documents TD-000 through TD-028. |
| `issues/` | Issue Specifications derived from approved Technical Designs. |
| `prompts/` | Implementation, review, bugfix, and system prompts used by the documentation-first workflow. |
| `backend/` | Implementation source and tests. Documentation-only governance work must not modify this directory unless implementation work is explicitly approved. |

## Development Workflow

1. Confirm the current scope in [Current Status](./docs/CurrentStatus.md).
2. Confirm approved work in [Backlog](./docs/Backlog.md).
3. Trace requirements through [BRD](./docs/BRD.md), [PRD](./docs/PRD.md), [Architecture](./docs/Architecture.md), [Product Map](./docs/ProductMap.md), [Glossary](./docs/Glossary.md), and [ADR](./docs/Decisions.md).
4. Use the related Technical Design from [specs](./specs/).
5. Generate or update an Issue Specification only from approved Technical Design content.
6. Generate Acceptance Criteria only from the related Technical Design and Issue Specification.
7. Implement only the approved issue scope.
8. Review the implementation against Acceptance Criteria.
9. Freeze the completed artifact only after traceability and validation are complete.

## Specification Driven Development

PROJECT365 preserves Specification Driven Development:

- Requirements must trace to approved governance documents.
- Technical Designs must not introduce new architecture.
- Issue Specifications must derive from Technical Designs.
- Acceptance Criteria must be measurable and traceable.
- Implementation must not expand scope beyond approved documentation.
- Review must verify dependency direction, responsibility boundaries, and terminology.
- Freeze occurs only after governance, implementation, and validation are aligned.

## Governance Links

- [Project Context](./docs/ProjectContext.md)
- [BRD](./docs/BRD.md)
- [PRD](./docs/PRD.md)
- [Architecture](./docs/Architecture.md)
- [Product Map](./docs/ProductMap.md)
- [Glossary](./docs/Glossary.md)
- [ADR](./docs/Decisions.md)
- [Roadmap](./docs/Roadmap.md)
- [Backlog](./docs/Backlog.md)
- [Current Status](./docs/CurrentStatus.md)

## Delivery Artifacts

- [Technical Designs](./specs/)
- [Issue Specifications](./issues/)
- [Acceptance Criteria Template](./templates/AcceptanceCriteriaTemplate.md)
- [Technical Design Template](./templates/TechnicalDesignTemplate.md)
- [Issue Specification Template](./templates/IssueSpecificationTemplate.md)
- [Implementation Prompt](./prompts/IMPLEMENTATION_PROMPT.md)
- [Review Prompt](./prompts/REVIEW_PROMPT.md)
- [Freeze status](./docs/CurrentStatus.md)

## Current Scope

Current implementation scope remains Foundation v0.1 only:

- MarketData Contract
- Health Layer
- Snapshot Engine

The complete documentation architecture tracks TD-000 through TD-028, but documentation readiness does not imply implementation completion.
