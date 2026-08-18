# API Conventions & Patterns

This document describes the standard patterns used for all API routes in the Nutrition Meal Planner.

## Response Format

All API responses follow a standard format with success/error structure.

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "reason": "not-an-email"
    }
  }
}
```

## Error Codes

All errors use standardized error codes:

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_INPUT` | 400 | Malformed request data |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `INTERNAL_ERROR` | 500 | Server error |

## API Route Structure

Typical API route structure in `app/api/*/route.ts`:

```typescript
import { withErrorHandler, json, jsonError } from "@/lib/api/handlers";
import { ApiError, ErrorCode } from "@/lib/api/errors";
import { validateInput, passwordSchema } from "@/lib/api/validators";

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();

  // 1. Validate input
  const { password } = validateInput(
    z.object({ password: passwordSchema }),
    body
  );

  // 2. Business logic
  try {
    // Database operations, etc.
  } catch (error) {
    throw new ApiError(
      ErrorCode.INTERNAL_ERROR,
      "Failed to process request",
      500
    );
  }

  // 3. Return success response
  return json({ success: true, message: "Done" });
});
```

## Common Patterns

### 1. Error Handling

Use the `withErrorHandler` wrapper for all routes:

```typescript
export const POST = withErrorHandler(async (req: Request) => {
  // Your handler code
  if (!data) {
    throw new ApiError(
      ErrorCode.NOT_FOUND,
      "User not found",
      404
    );
  }
  return json(data);
});
```

### 2. Input Validation

Use Zod schemas from `lib/api/validators.ts`:

```typescript
import { emailSchema, passwordSchema } from "@/lib/api/validators";
import { z } from "zod";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const validated = validateInput(schema, body);
```

### 3. Database Queries

Use the Prisma client from `lib/db/db.ts`:

```typescript
import { db } from "@/lib/db/db";

const user = await db.user.findUnique({
  where: { email: validated.email },
});
```

### 4. Password Operations

Use utilities from `lib/auth/password.ts`:

```typescript
import { hashPassword, verifyPassword } from "@/lib/auth/password";

// Hash before storing
const hashed = await hashPassword(plaintext);

// Verify when checking
const isValid = await verifyPassword(plaintext, hashed);
```

### 5. Logging

Use the logger from `lib/utils/logger.ts`:

```typescript
import { logger } from "@/lib/utils/logger";

logger.info("User login attempt", { email });
logger.error("Database error", error);
```

## Authentication Pattern

Protected routes check for authenticated session:

```typescript
import { auth } from "@/middleware";

export const POST = withErrorHandler(async (req: Request) => {
  const session = await auth();

  if (!session) {
    throw new ApiError(
      ErrorCode.UNAUTHORIZED,
      "Not authenticated",
      401
    );
  }

  const userId = session.user.id;
  // Use authenticated user ID
});
```

## Pagination Pattern

For list endpoints (Phase 2+):

```typescript
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// Usage
const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
const pageSize = 20;

const total = await db.food.count();
const items = await db.food.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
});

return json({
  items,
  pagination: {
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  },
});
```

## Type Safety

All responses are TypeScript-typed:

```typescript
import { ApiSuccessResponse, ApiErrorResponse } from "@/lib/types/api";

const response: ApiSuccessResponse<User> = {
  success: true,
  data: user,
};

const error: ApiErrorResponse = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input",
  },
};
```

## Testing Guidelines

### Test Success Case

```typescript
const res = await fetch("http://localhost:3000/api/users", {
  method: "POST",
  body: JSON.stringify({ email: "test@example.com", password: "Test123!" }),
});

const data = await res.json();
expect(data.success).toBe(true);
expect(data.data.id).toBeDefined();
```

### Test Error Case

```typescript
const res = await fetch("http://localhost:3000/api/users", {
  method: "POST",
  body: JSON.stringify({ email: "invalid" }),
});

const data = await res.json();
expect(data.success).toBe(false);
expect(data.error.code).toBe("VALIDATION_ERROR");
```

## Phase 1 API Routes (Planned)

**Note:** These are NOT implemented in Phase 1, only the foundation is ready.

- `POST /api/auth/register` - UC01: Register User
- `POST /api/auth/login` - UC02: Login
- `POST /api/auth/forgot-password` - UC03: Forgot Password (send token)
- `POST /api/auth/reset-password` - UC03: Reset Password (verify token and update)
- `GET /api/auth/session` - UC04: Get Current Session (if authenticated)
- `POST /api/auth/logout` - UC05: Logout

## Configuration

### Environment Variables

- `NEXTAUTH_SECRET` - For JWT signing (minimum 32 characters)
- `NEXTAUTH_URL` - Application URL for redirects
- `DATABASE_URL` - PostgreSQL connection string

### Validation Rules

See `lib/api/validators.ts` for current schemas:

- **Email:** Standard email format
- **Password:** Min 8 chars, requires uppercase, lowercase, number, special char
- **Name:** 2-100 characters
- **UUID:** Standard UUID v4 format

## Troubleshooting

### "Invalid input" errors

Check that request body matches expected schema. Use the error details to find which field failed.

### "Not authenticated" errors

Ensure:
1. User is logged in
2. Cookie contains valid JWT token
3. Token has not expired (30-day expiry)

### Database errors

Check:
1. `DATABASE_URL` is correct
2. PostgreSQL is running
3. Migrations have been applied

See [SETUP.md](./SETUP.md) for database troubleshooting.
