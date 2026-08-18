import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

/**
 * NextAuth.js v5 authentication handler
 * Exports auth(), signIn(), and signOut() functions
 */
export const { auth, signIn, signOut } = NextAuth(authConfig);
