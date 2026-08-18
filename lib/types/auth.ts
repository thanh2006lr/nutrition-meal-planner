import { User, PasswordResetToken } from "@prisma/client";

/**
 * User type (from Prisma)
 */
export type UserType = User;

/**
 * User without sensitive fields
 */
export type UserPublic = Omit<UserType, "password">;

/**
 * Password reset token type (from Prisma)
 */
export type PasswordResetTokenType = PasswordResetToken;

/**
 * Auth session user (for NextAuth.js)
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

/**
 * Auth session (for NextAuth.js)
 */
export interface AuthSession {
  user: AuthUser;
  expires: string;
}
