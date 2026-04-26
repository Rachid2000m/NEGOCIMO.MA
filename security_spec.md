# Security Specification - NEGOCIMO B2B

## 1. Data Invariants
- A `Product` must have a valid `slug`, `name`, `category`, and `status`. Only admins can manage products.
- A `Sector` must have a unique `id` (slug) and `name`. Only admins can manage sectors.
- A `Project` must reference an existing `sector`. Only admins can manage projects.
- `Settings` (global) can only be updated by admins. Public can read them.
- `Messages` are created by anyone but can only be read/managed by admins. `status` must be `New` on creation.
- `Admins` collection defines who has administrative privileges. Only existing admins can add new admins.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)

### Payload 1: Unauthorized Settings Update
- **Target**: `update /settings/global`
- **Actor**: Unauthenticated or non-admin user
- **Payload**: `{ "heroTitle": "Hacked Title", "updatedAt": "2026-04-26T00:00:00Z" }`
- **Expectation**: `PERMISSION_DENIED`

### Payload 2: Self-Promotion to Admin
- **Target**: `create /admins/{my_uid}`
- **Actor**: Regular user `{ uid: 'attacker_123', email: 'attacker@gmail.com' }`
- **Payload**: `{ "email": "attacker@gmail.com", "createdAt": "2026-04-26T09:00:00Z" }`
- **Expectation**: `PERMISSION_DENIED` (Only existing admins can create other admins)

### Payload 3: Product Injection with Shadow Field
- **Target**: `create /products/new-product`
- **Actor**: Admin user
- **Payload**: `{ "name": "Fake Product", "category": "Fake", "price": "0", "stock": 100, "status": "Actif", "image": "url", "description": "desc", "slug": "fake", "updatedAt": "2026-04-26T09:00:00Z", "isVerified": true }`
- **Expectation**: `PERMISSION_DENIED` (Shadow field `isVerified` should be blocked by `keys().size()` or `affectedKeys().hasOnly()`)

### Payload 4: Message Status Overwrite
- **Target**: `create /messages/msg_123`
- **Actor**: Anonymous user
- **Payload**: `{ "name": "Attacker", "email": "a@a.com", "phone": "123", "message": "hello", "status": "Read", "createdAt": "2026-04-26T09:00:00Z" }`
- **Expectation**: `PERMISSION_DENIED` (Status must be `New` on creation)

### Payload 5: Large String Poisoning (Resource Exhaustion)
- **Target**: `create /messages/msg_large`
- **Actor**: Public
- **Payload**: `{ "name": "A".repeat(1001), "email": "a@a.com", "phone": "123", "message": "hello", "status": "New", "createdAt": "2026-04-26T09:00:00Z" }`
- **Expectation**: `PERMISSION_DENIED` (Name size limit exceeded)

### Payload 6: Invalid Enum Value in Product
- **Target**: `update /products/p1`
- **Actor**: Admin
- **Payload**: `{ "status": "Deleted" }`
- **Expectation**: `PERMISSION_DENIED` (Status must match enum `Actif|Inactif|Rupture`)

### Payload 7: Orphaned Project (Non-existent Sector)
- **Target**: `create /projects/proj_123`
- **Actor**: Admin
- **Payload**: `{ "title": "Proj", "sector": "ghost-sector", "imageUrl": "url", "isLarge": false }`
- **Expectation**: `PERMISSION_DENIED` (Relational check should verify sector existence)

### Payload 8: Settings update without updatedAt
- **Target**: `update /settings/global`
- **Actor**: Admin
- **Payload**: `{ "heroTitle": "New Title" }`
- **Expectation**: `PERMISSION_DENIED` (Validation should require `updatedAt` field or `affectedKeys` should include it)

### Payload 9: Message read by non-admin
- **Target**: `get /messages/msg_123`
- **Actor**: The user who created the message (or any other user)
- **Expectation**: `PERMISSION_DENIED` (Only admins can read messages)

### Payload 10: ID Poisoning (Project ID)
- **Target**: `create /projects/!!invalid!!ID!!`
- **Actor**: Admin
- **Payload**: `{ "title": "Proj", "sector": "sect_1", "imageUrl": "url", "isLarge": false }`
- **Expectation**: `PERMISSION_DENIED` (isValidId regex check)

### Payload 11: Timestamp Spoofing
- **Target**: `create /messages/msg_time`
- **Actor**: Public
- **Payload**: `{ ..., "createdAt": "2020-01-01T00:00:00Z" }`
- **Expectation**: `PERMISSION_DENIED` (Must use `request.time`)

### Payload 12: Admin Identity Spoofing
- **Target**: `update /admins/admin_uid`
- **Actor**: Another Admin
- **Payload**: `{ "email": "hacker@negocimo.ma" }`
- **Expectation**: `PERMISSION_DENIED` (Immutability check on email)

---

## 3. Test Runner (Draft)
```typescript
// firestore.rules.test.ts (Psuedo-code/Guideline)
// Use @firebase/rules-unit-testing to verify above payloads.
```
