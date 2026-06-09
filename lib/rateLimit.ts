const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

interface WindowEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, WindowEntry>();

// Prune stale entries every 30 minutes to prevent unbounded memory growth
const PRUNE_INTERVAL_MS = 30 * 60 * 1000;
let lastPruned = Date.now();

function pruneStaleEntries() {
  const now = Date.now();
  if (now - lastPruned < PRUNE_INTERVAL_MS) return;
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart >= WINDOW_MS) {
      store.delete(key);
    }
  }
  lastPruned = now;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetIn: number; // seconds until window resets
}

export function checkRateLimit(ip: string): RateLimitResult {
  pruneStaleEntries();

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return {
      allowed: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      resetIn: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (entry.count >= MAX_REQUESTS) {
    const resetIn = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
    return {
      allowed: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      resetIn,
    };
  }

  entry.count += 1;
  const resetIn = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
  return {
    allowed: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - entry.count,
    resetIn,
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list; the first is the real client
    return forwarded.split(",")[0].trim();
  }
  // Fallback — unknown IP gets a shared bucket (conservative)
  return "unknown";
}
