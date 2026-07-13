ISSUE-001

Implement MarketData Contract

ID: ISSUE-001
Status: Ready to Freeze
Priority: P0 - Critical
Sprint: Sprint #1 - Foundation Layer


---

Objective

Implement the immutable MarketData contract defined in:

TD-001 - MarketData Contract

This is the first implementation of PROJECT365 and becomes the foundation for all downstream components.


---

Dependencies

TD-001 MarketData Contract

No other dependencies.


---

Deliverables

Create:

backend/
└── src/
    └── core/
        └── market-data/
            ├── MarketData.ts
            ├── MarketDataFactory.ts
            ├── MarketDataValidator.ts
            ├── types.ts
            └── index.ts


---

Requirements

1. MarketData Type

Implement:

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change1h: number;
  change24h: number;
  volume24hUsd: number;
  marketCapUsd: number;
  totalMarketCapUsd: number;
  total3MarketCap: number;
  btcDominance: number;
  usdtDominance: number;
  usdcDominance: number;
  circulatingSupply: number;
  ath: number;
  atl: number;
  fetchedAt: number;
  fetchSource: string;
  contractVersion: string;
}


---

2. Validator

Implement:

MarketDataValidator.validate()

Must validate:

Required fields.

Number.isFinite()

Business rules:

priceUsd >= 0
marketCapUsd >= 0
volume24hUsd >= 0
circulatingSupply >= 0
ath >= 0
atl >= 0
fetchedAt > 0


---

3. Factory

Implement:

MarketDataFactory.create()

Responsibilities:

validate input;

create object;

freeze object;

return immutable MarketData.



---

4. Immutability

Implementation recommendation:

Object.freeze()

No mutation allowed.


---

5. Serialization

Must support:

JSON.stringify()
JSON.parse()


---

Non Requirements

Do NOT implement:

API calls

Database

Snapshot

Health Layer

Delta calculations

Business logic

Framework dependencies



---

Acceptance Criteria

AC-001

Valid MarketData can be created.


---

AC-002

Invalid MarketData throws error.


---

AC-003

Missing required field throws error.


---

AC-004

Returned object is immutable.


---

AC-005

Serialization works.


---

AC-006

No external dependencies.


---

Suggested Errors

MissingRequiredFieldError
InvalidNumberError
InvalidBusinessRuleError


---

Unit Tests

Create:

backend/
└── tests/
    └── market-data/
        ├── MarketDataFactory.test.ts
        └── MarketDataValidator.test.ts

Test cases:

create valid object

reject null

reject undefined

reject missing fields

reject NaN

reject Infinity

reject invalid business rules

verify immutability

verify serialization



---

Definition of Done

All tests pass.

No lint errors.

No mutation possible.

TD-001 fully implemented.

Documentation updated.



---

AI Implementation Constraints

Pure TypeScript.

No framework.

No database.

No network calls.

No async code.

No external libraries unless absolutely necessary.



---

Expected Output

MarketData module ready for Health Layer implementation.


---


Setelah itu, baru kita masuk ke implementasi kode pertama PROJECT365. 🚀
