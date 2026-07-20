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
| `project365/`, `business/`, `research/`, `architecture/`, `specifications/`, `acceptance-criteria/`, `implementation/` | SDLC documentation structure for governance, business, research, architecture, specifications, acceptance criteria, and implementation documents. |
| `templates/` | Templates for Technical Designs, Issue Specifications, and Acceptance Criteria. |
| `specs/` | Legacy Technical Design documents TD-000 through TD-028. |
| `issues/` | Issue Specifications ISSUE-001 through ISSUE-028 derived from approved Technical Designs. |
| `prompts/` | Implementation, review, bugfix, and system prompts used by the documentation-first workflow. |
| `backend/` | Implementation source and tests. Implementation is pending and belongs to later milestones. Documentation-only governance work must not modify this directory unless implementation work is explicitly approved. |

## Development Workflow

1. Confirm the current scope in [Current Status](./implementation/current-status.md).
2. Confirm approved work in [Backlog](./implementation/backlog.md).
3. Trace requirements through [BRD](./business/brd.md), [PRD](./business/prd.md), [Architecture](./architecture/architecture.md), [Product Map](./architecture/product-map.md), [Glossary](./project365/glossary.md), and [ADR](./architecture/decisions.md).
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
- Architecture Freeze covers governance, documentation, specifications, Technical Designs, Issue Specifications, and Acceptance Criteria; it does not require implementation completion.
- Implementation freeze occurs only after implementation and validation are aligned.

## Governance Links

- [Project Context](./project365/project-context.md)
- [BRD](./business/brd.md)
- [PRD](./business/prd.md)
- [Architecture](./architecture/architecture.md)
- [Product Map](./architecture/product-map.md)
- [Glossary](./project365/glossary.md)
- [ADR](./architecture/decisions.md)
- [Roadmap](./project365/roadmap.md)
- [Backlog](./implementation/backlog.md)
- [Current Status](./implementation/current-status.md)

## Delivery Artifacts

- [Technical Designs](./specs/)
- [Issue Specifications](./issues/)
- [Acceptance Criteria Template](./templates/AcceptanceCriteriaTemplate.md)
- [Technical Design Template](./templates/TechnicalDesignTemplate.md)
- [Issue Specification Template](./templates/IssueSpecificationTemplate.md)
- [Implementation Prompt](./prompts/IMPLEMENTATION_PROMPT.md)
- [Review Prompt](./prompts/REVIEW_PROMPT.md)
- [Freeze status](./implementation/current-status.md)

## Architecture Freeze Scope

Architecture Freeze covers Governance, Documentation, Specifications, Technical Designs, Issue Specifications, and Acceptance Criteria. Architecture Freeze DOES NOT require implementation completion. Implementation belongs to later milestones.

TD-000 is an architectural prerequisite and intentionally does not generate Issue Specification or Acceptance Criteria documents.

Current implementation status: Documentation Complete; Implementation Pending. Architecture Freeze may complete before implementation.

## Current Scope

Current implementation scope remains Foundation v0.1 only:

- MarketData Contract
- Health Layer
- Snapshot Engine

Documentation Complete. Architecture Frozen. Implementation Pending.

The complete documentation architecture tracks TD-000 through TD-028; all Technical Designs are Frozen, all Issue Specifications are Completed, and all Acceptance Criteria are Completed. Architecture Freeze may complete before implementation.
