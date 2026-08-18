# Local Development Setup Guide

This guide covers setting up the Nutrition Meal Planner project for local development.

## Prerequisites

- Node.js 18.17 or later
- PostgreSQL 12 or later (or use a cloud PostgreSQL service)
- npm or yarn

## 1. Install Dependencies

```bash
npm install
```

## 2. Database Setup

### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create the database
createdb nutrition_meal_planner

# Update .env.local with your connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/nutrition_meal_planner
```

### Option B: Remote Database (Railway, Supabase, etc.)

Use your cloud provider's connection string:

```bash
# Update .env.local with the connection string from your provider
DATABASE_URL=postgresql://user:password@host:port/database
```

## 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your values:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/nutrition_meal_planner

# NextAuth.js Configuration
NEXTAUTH_SECRET=generate-a-random-secret-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000

# Application Environment
NODE_ENV=development
```

To generate a secure `NEXTAUTH_SECRET`, run:

```bash
openssl rand -base64 32
```

## 4. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

This will:
- Create the database schema (User and PasswordResetToken tables)
- Create migration file in `prisma/migrations/`
- Generate the Prisma client

## 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 6. View Database (Optional)

Open Prisma Studio to view your database:

```bash
npx prisma studio
```

This opens a browser interface at `http://localhost:5555`

## Troubleshooting

### Database Connection Error

- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database user has permissions

### Migration Failed

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or manually:
# 1. Drop the database
# 2. Create a new one
# 3. Run migrations again
```

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

## Common Commands

```bash
# View database schema
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Run build
npm run build

# Run linter
npm run lint

# Run type check
npx tsc --noEmit
```

## Architecture Notes

### Database Layer

- **ORM:** Prisma 5.22.0
- **Models:** User, PasswordResetToken (Phase 1)
- **Connection Pool:** Managed by Prisma

### Authentication

- **Provider:** NextAuth.js v5 with Credentials provider
- **Session:** JWT (stateless, no database sessions)
- **Password:** bcryptjs with 10 salt rounds
- **Token Expiry:** 30 days

### API Convention

- All API routes use consistent error/success responses
- Error handling with custom error codes
- Input validation with Zod schemas

## Next Steps

- Read `DATABASE.md` for schema documentation
- Read `API.md` for API conventions
- See requirements.md for full feature list
