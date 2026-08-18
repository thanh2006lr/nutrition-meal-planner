# Database Schema Documentation

## Overview

Phase 1 database contains 2 core models:

1. **User** - User accounts and authentication
2. **PasswordResetToken** - Password recovery tokens

Additional models will be added in subsequent phases.

## User Model

Stores user account information and authentication credentials.

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed with bcryptjs
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

enum Role {
  USER
  ADMIN
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier, generated automatically |
| `email` | String | Email address (unique constraint) |
| `password` | String | Bcryptjs-hashed password |
| `name` | String | User's display name |
| `role` | Role enum | USER (default) or ADMIN |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### Indexes

- `email` - For fast login lookup

### Use Cases

- **UC01: Register User** - Create new User record
- **UC02: Login** - Find User by email and verify password
- **UC06: Admin Features** - Query users with role = ADMIN

## PasswordResetToken Model

Stores temporary tokens for password recovery (UC03: Forgot Password).

```prisma
model PasswordResetToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expires   DateTime
  createdAt DateTime @default(now())

  @@index([email])
  @@index([token])
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier |
| `email` | String | User's email (NOT foreign key in Phase 1) |
| `token` | String | Unique reset token (hashed) |
| `expires` | DateTime | Token expiration time |
| `createdAt` | DateTime | Token creation timestamp |

### Indexes

- `email` - For finding tokens by user
- `token` - For fast token lookup during reset

### Use Cases

- **UC03: Forgot Password** - Create token, send via email
- **UC03: Reset Password** - Find token, verify not expired, update User password

## Phase 1 Limitations & Notes

### What's NOT in Phase 1

- No Session table (JWT sessions are stateless)
- No Account table (no OAuth providers)
- No VerificationToken (no email verification)
- No Authenticator (no 2FA/passkeys)
- No refresh tokens (30-day JWT expiry)

### Why?

Requirements.md specifies:
- Credentials provider only (no OAuth)
- No email verification required
- No 2FA/passkeys in Phase 1
- JWT is simpler than database sessions for single provider

### Password Storage

- Passwords are ALWAYS hashed with bcryptjs before storage
- `password` field contains bcryptjs hash (never plain text)
- Hashing done before saving: `new User { password: await hashPassword(plaintext) }`
- Verification: `await verifyPassword(plaintext, storedHash)`

## Phase 2+ Expansion

Next phases add:

- **Phase 3:** UserProfile, HealthInformation, DietaryPreferences, BudgetConstraints, HealthGoals
- **Phase 4:** Foods, Recipes, RecipeIngredients, MealPlans, MealPlanDays, FavoriteMeals
- **Phase 5:** UserMeals, UserNutritionTracking
- **Phase 7:** FoodImages
- **Phase 9:** ChatMessages
- **Phase 10:** MealRatings, MealComments
- **Phase 11:** ReminderSettings, Notifications
- **Phase 12:** AdminAuditLog, SystemMetrics

## Common Queries

### Find user by email

```typescript
const user = await db.user.findUnique({
  where: { email: "user@example.com" },
});
```

### Create user

```typescript
import { hashPassword } from "@/lib/auth/password";

const user = await db.user.create({
  data: {
    email: "user@example.com",
    password: await hashPassword("plaintext_password"),
    name: "John Doe",
    role: "USER",
  },
});
```

### Verify password

```typescript
import { verifyPassword } from "@/lib/auth/password";

const isValid = await verifyPassword(plaintext, user.password);
```

### Create password reset token

```typescript
const token = await db.passwordResetToken.create({
  data: {
    email: "user@example.com",
    token: generateRandomToken(), // Custom implementation
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  },
});
```

### Find reset token

```typescript
const resetToken = await db.passwordResetToken.findUnique({
  where: { token: "token_value" },
});

// Check if expired
const isExpired = resetToken.expires < new Date();
```

## Data Validation

All data is validated before database operations:

### User Creation (UC01)

- Email: Valid email format (Zod)
- Password: Min 8 chars, uppercase, lowercase, number, special character
- Name: 2-100 characters

### Password Reset (UC03)

- Email: Must exist in User table
- Token: 32+ character random string
- Expires: 24 hours from creation

See `lib/api/validators.ts` for schemas.

## Constraints & Rules

1. **Email uniqueness:** Each user has unique email
2. **Password hashing:** Never store plain text passwords
3. **Token expiry:** Reset tokens must expire (24 hours recommended)
4. **Soft deletes:** Not implemented in Phase 1 (can be added later)
5. **Cascading deletes:** Not applicable in Phase 1

## Migration Strategy

### For Development

```bash
# Auto-create migrations
npx prisma migrate dev --name add_feature

# Reset and reseed
npx prisma migrate reset
```

### For Production

```bash
# Apply pending migrations
npx prisma migrate deploy

# Check status
npx prisma migrate status
```

See [SETUP.md](./SETUP.md) for detailed instructions.
