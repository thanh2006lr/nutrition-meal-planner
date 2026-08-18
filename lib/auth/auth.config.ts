import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db/db";
import { verifyPassword } from "@/lib/auth/password";
import { z } from "zod";

/**
 * Auth.js v5 configuration with JWT session strategy
 * Using Credentials provider with bcryptjs password verification
 * No database Session table needed (JWT is stateless)
 * No OAuth providers
 */
export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },

      /**
       * Authorize function: Verify user credentials
       * Called during signin with email and password
       */
      async authorize(credentials) {
        try {
          // Validate input
          const credSchema = z.object({
            email: z.string().email(),
            password: z.string().min(1),
          });

          const { email, password } = credSchema.parse(credentials);

          // Find user in database
          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user) {
            return null; // User not found
          }

          // Verify password
          const isPasswordValid = await verifyPassword(password, user.password);
          if (!isPasswordValid) {
            return null; // Password incorrect
          }

          // Return user object (without password)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    /**
     * JWT callback: Called when JWT is created or updated
     * Add user data to JWT token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as { role?: string }).role || "USER";
      }
      return token;
    },

    /**
     * Session callback: Called when session is requested
     * Add token data to session object
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        (session.user as { role?: string }).role = String(token.role || "USER");
      }
      return session;
    },

    /**
     * SignIn callback: Called before user is signed in
     * Return true to allow signin, false to deny
     */
    async signIn({ user }) {
      // Allow signin if user exists and was authorized
      return !!user;
    },

    /**
     * Redirect callback: Called when redirecting after signin/signout
     */
    async redirect({ url, baseUrl }) {
      // Allow redirect to same origin, otherwise redirect to home
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // Allow custom pages and error handling
  trustHost: true,

  events: {
    /**
     * signOut event: Called when user signs out
     */
    signOut: async () => {
      // Add custom signout logic here if needed
    },
  },
} satisfies NextAuthConfig;
