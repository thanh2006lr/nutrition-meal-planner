import { NextResponse } from "next/server";
import { ApiError, ErrorCode } from "./errors";

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  meta?: Record<string, unknown>
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  };
}

/**
 * Create a JSON response for successful API calls
 */
export function json<T>(
  data: T,
  meta?: Record<string, unknown>,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(successResponse(data, meta), { status });
}

/**
 * Create a JSON error response
 */
export function jsonError(
  error: ApiError | Error,
  status?: number
): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(error.toJSON(), { status: error.statusCode });
  }

  // Handle unexpected errors
  return NextResponse.json(
    {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: "An unexpected error occurred",
      },
    },
    { status: status || 500 }
  );
}

/**
 * Wrap API route handler with error handling
 */
export function withErrorHandler(
  handler: (req: Request) => Promise<NextResponse>
) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error("API Error:", error);
      if (error instanceof ApiError) {
        return jsonError(error);
      }
      return jsonError(error instanceof Error ? error : new Error(String(error)));
    }
  };
}
