# Acceptance Criteria

## 1. Document Information

| Field | Value |
|------|------|
| Status | Draft / Active / Approved / Frozen |
| Version | 1.0 |
| Owner | |
| Last Updated | |
| Depends On | BRD, PRD, Architecture, Product Map, ADR, Technical Design, Issue Specification |
| Referenced By | Implementation Prompt, Review, Freeze |

---

## 2. Purpose

Describe the acceptance objective for the related implementation work.

This document translates approved Technical Design and Issue Specification requirements into measurable acceptance criteria.

Do not redefine business requirements, product requirements, architecture, technical design, or implementation scope.

---

## 3. Scope

Describe what this Acceptance Criteria document validates.

Include:

- Related module or issue.
- Functional acceptance boundaries.
- Non-functional acceptance boundaries.
- Validation expectations.
- Test expectations.

Exclude anything not approved by the related Technical Design and Issue Specification.

---

## 4. Dependencies

List the authoritative inputs for this Acceptance Criteria document.

Required dependencies:

- BRD.
- PRD.
- Architecture.
- Product Map.
- Glossary.
- ADR.
- Related Technical Design.
- Related Issue Specification.

No acceptance criterion may introduce unapproved product scope, architecture, module ownership, or implementation behavior.

---

## 5. Related Technical Design

Identify the related Technical Design.

| Field | Value |
|------|------|
| Technical Design ID | |
| Technical Design Name | |
| Technical Design Status | |
| Technical Design Path | |

Acceptance criteria must remain fully traceable to this Technical Design.

---

## 6. Related Issue Specification

Identify the related Issue Specification.

| Field | Value |
|------|------|
| Issue ID | |
| Issue Name | |
| Issue Status | |
| Issue Specification Path | |

Acceptance criteria must remain fully traceable to this Issue Specification.

---

## 7. Functional Acceptance Criteria

Define measurable functional acceptance criteria.

Each criterion must use clear pass/fail wording.

| ID | Acceptance Criterion | Source |
|----|---------------------|--------|
| AC-F-001 | | Related Technical Design; Related Issue Specification |

Functional acceptance criteria must not expand approved scope.

---

## 8. Non-Functional Acceptance Criteria

Define measurable non-functional acceptance criteria.

| ID | Acceptance Criterion | Source |
|----|---------------------|--------|
| AC-NF-001 | | Related Technical Design; Related Issue Specification |

Non-functional acceptance criteria must preserve approved performance, reliability, maintainability, testability, security, explainability, and auditability requirements where applicable.

---

## 9. Validation Rules

Define validation rules required for acceptance.

Validation rules must be deterministic and auditable.

Include:

- Required inputs.
- Required outputs.
- Rejection behavior.
- Boundary conditions.
- Dependency direction checks.
- Traceability checks.

---

## 10. Test Requirements

Define required test coverage for acceptance.

Include:

- Unit test requirements.
- Integration test requirements when approved by the Issue Specification.
- Negative test requirements.
- Regression test requirements.
- Documentation verification requirements.

Tests must validate approved behavior without introducing implementation details outside the related Issue Specification.

---

## 11. Out of Scope

List items that are explicitly excluded from acceptance.

This Acceptance Criteria document must not include:

- New business requirements.
- New product requirements.
- New architecture decisions.
- New modules.
- New technical design responsibilities.
- Implementation behavior not approved by the related Issue Specification.

---

## 12. Traceability

Map each acceptance area to authoritative sources.

| Acceptance Area | Source |
|-----------------|--------|
| Business intent | BRD |
| Product requirements | PRD |
| Architecture rules | Architecture; ADR |
| Product structure and terminology | Product Map; Glossary |
| Technical design | Related Technical Design |
| Implementation scope | Related Issue Specification |

Every acceptance criterion must trace to an approved source.

---

## 13. References

List all referenced governance documents.

- BRD
- PRD
- Architecture
- Product Map
- Glossary
- ADR
- Related Technical Design
- Related Issue Specification

---

## 14. Change History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | | Initial Acceptance Criteria document. |
