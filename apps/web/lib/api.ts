const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

// Log on startup so we can verify the URL in Railway logs
console.log(`[api] API_BASE_URL configured as: ${API_BASE_URL}`);

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { next?: { revalidate?: number } },
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const startTime = Date.now();

  console.log(`[api] Fetching: ${url}`);

  try {
    const response = await fetch(url, options);
    const elapsed = Date.now() - startTime;

    if (!response.ok) {
      console.error(
        `[api] HTTP error: ${response.status} ${response.statusText} for ${url} (${elapsed}ms)`,
      );
      throw new Error(`API error ${response.status}: ${response.statusText} for ${path}`);
    }

    console.log(`[api] Success: ${url} (${elapsed}ms)`);
    return response.json() as T;
  } catch (error) {
    const elapsed = Date.now() - startTime;

    // Log detailed error info
    console.error(`[api] Fetch failed for ${url} after ${elapsed}ms`);
    console.error(`[api] Error:`, error);

    if (error instanceof Error && 'cause' in error) {
      console.error(`[api] Cause:`, error.cause);
    }

    // Re-throw with context
    throw new Error(
      `Failed to fetch ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { cause: error },
    );
  }
}

export { API_BASE_URL };
