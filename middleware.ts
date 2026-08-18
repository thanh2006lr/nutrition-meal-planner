import { auth } from "@/lib/auth/auth";

/**
 * Middleware export for Next.js
 * Validates JWT token on protected routes
 */
export const middleware = auth((req) => {
  // Request is passed through, auth handles session validation
  return undefined;
});

/**
 * Utility function for route protection
 * Can be used in API routes to check authentication
 */
export async function withAuth() {
  const session = await auth();
  return !!session;
}

/**
 * Configure which routes to run middleware on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - login/register pages
     */
    "/((?!_next/static|_next/image|favicon.ico|public|login|register).*)",
  ],
};

