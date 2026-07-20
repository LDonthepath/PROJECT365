# PROJECT365 SDLC Migration Matrix

Version: 1.0
Status: Draft

## Purpose

Dokumen ini mencatat migrasi dari struktur SDD lama menuju P365 SDLC.

Prinsip:

- Tidak menghapus dokumentasi lama.
- Tidak mengulang pekerjaan yang sudah selesai.
- Mempertahankan traceability.
- Memindahkan konsep ke lokasi yang sesuai dengan lifecycle baru.

---

# Current Structure → Target Structure


| Current Location | Document | Target Location | Action | Status |
|---|---|---|---|---|
| project365/ | Goals.md | business/vision/ | Split / Move | Pending |
| project365/ | Mission.md | business/vision/ | Move | Pending |
| project365/ | Scope.md | business/vision/ | Move | Pending |
| project365/ | project-context.md | docs/ | Review | Pending |
| project365/ | glossary.md | docs/ | Move | Pending |
| project365/ | roadmap.md | business/roadmap/ | Move | Pending |
| business/ | brd.md | business/vision/ | Refactor | Pending |
| business/ | prd.md | business/features/ | Refactor | Pending |
| business/ | feature-map.md | business/features/ | Move | Pending |
| architecture/ | architecture.md | architecture/system/ | Move | Pending |
| architecture/ | product-map.md | architecture/system/ | Move | Pending |
| architecture/ | decisions.md | architecture/system/ | Move | Pending |
| specs/ | TD-000–TD-028 | specifications/technical-design/ | Move | Pending |
| issues/ | ISSUE-000–028 | implementation/issues/ | Move | Pending |
| acceptance-criteria/ | AC files | acceptance-criteria/ | Verify | Pending |
| research/ | Empty | research/* | Populate later | Pending |
| design/ | Missing | design/* | Create later | Pending |

---

# Migration Rules

## Rule 1 — No Rewrite Without Need

Dokumen lama dianggap valid sampai ada alasan untuk memperbaiki.

## Rule 2 — Split Before Delete

Dokumen besar seperti BRD dan PRD tidak langsung dihapus.

Pisahkan:

- Vision
- Feature Definition
- Business Logic
- User Story

## Rule 3 — Technical Design Remains Stable

TD-000 sampai TD-028 tetap menjadi historical technical decisions.

Migrasi lokasi tidak mengubah isi.

## Rule 4 — Implementation Starts Only After New Flow

Feature baru wajib mengikuti:

Vision
↓
Research
↓
Product Definition
↓
Business Logic
↓
UX Flow
↓
Data Model
↓
Technical Design
↓
Architecture Review
↓
Contract
↓
Issue
↓
AC
↓
Implementation

---

# Migration Status

Current:

- Existing documentation: Imported
- Structure analysis: Complete
- Target SDLC defined: Pending formalization
- File movement: Not started
- Document refinement: Not started