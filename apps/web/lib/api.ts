const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

// Log on startup so we can verify the URL in Railway logs
console.log(`[api] API_BASE_URL configured as: ${API_BASE_URL}`);

export type ApiErrorDetails = {
  url: string;
  path: string;
  method: string;
  baseUrl: string;
  elapsed: number;
  status?: number;
  statusText?: string;
  originalError?: string;
  code?: string;
};

// Delimiter used to encode details in the error message
// This survives Next.js error serialization across server/client boundary
const DETAILS_DELIMITER = '\n---API_ERROR_DETAILS---\n';

export class ApiError extends Error {
  details: ApiErrorDetails;

  constructor(message: string, details: ApiErrorDetails, cause?: unknown) {
    // Encode details in the message so they survive Next.js serialization
    const encodedMessage = `${message}${DETAILS_DELIMITER}${JSON.stringify(details)}`;
    super(encodedMessage, { cause });
    this.name = 'ApiError';
    this.details = details;
  }
}

/**
 * Parse an error message to extract ApiErrorDetails if present.
 * Returns the human-readable message and parsed details (if any).
 */
export function parseApiError(error: Error): {
  message: string;
  details: ApiErrorDetails | null;
} {
  const fullMessage = error.message;
  const delimiterIndex = fullMessage.indexOf(DETAILS_DELIMITER);

  if (delimiterIndex === -1) {
    return { message: fullMessage, details: null };
  }

  const message = fullMessage.substring(0, delimiterIndex);
  const detailsJson = fullMessage.substring(delimiterIndex + DETAILS_DELIMITER.length);

  try {
    const details = JSON.parse(detailsJson) as ApiErrorDetails;
    return { message, details };
  } catch {
    return { message: fullMessage, details: null };
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { next?: { revalidate?: number } },
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const method = options?.method ?? 'GET';
  const startTime = Date.now();

  console.log(`[api] Fetching: ${method} ${url}`);

  try {
    const response = await fetch(url, options);
    const elapsed = Date.now() - startTime;

    if (!response.ok) {
      console.error(
        `[api] HTTP error: ${response.status} ${response.statusText} for ${url} (${elapsed}ms)`,
      );
      throw new ApiError(`API error ${response.status}: ${response.statusText}`, {
        url,
        path,
        method,
        baseUrl: API_BASE_URL,
        elapsed,
        status: response.status,
        statusText: response.statusText,
      });
    }

    console.log(`[api] Success: ${url} (${elapsed}ms)`);
    return response.json() as T;
  } catch (error) {
    const elapsed = Date.now() - startTime;

    // Log detailed error info
    console.error(`[api] Fetch failed for ${url} after ${elapsed}ms`);
    console.error(`[api] Error:`, error);

    // If it's already an ApiError, re-throw it
    if (error instanceof ApiError) {
      throw error;
    }

    // Extract error code if available (e.g., ECONNREFUSED)
    const errorCode =
      error instanceof Error && 'cause' in error && typeof error.cause === 'object'
        ? (error.cause as { code?: string })?.code
        : undefined;

    if (error instanceof Error && 'cause' in error) {
      console.error(`[api] Cause:`, error.cause);
    }

    // Re-throw with context
    throw new ApiError(
      `Failed to fetch ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        url,
        path,
        method,
        baseUrl: API_BASE_URL,
        elapsed,
        originalError: error instanceof Error ? error.message : String(error),
        code: errorCode,
      },
      error,
    );
  }
}

export { API_BASE_URL };
