export const isClient = typeof window !== "undefined";

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

// ponytail: 4 copies of this TTL-localStorage logic lived in useGitHub,
// ContributorList, ContributorMarquee and DiscordWidget. One copy here.
export function getCache<T>(key: string, ttlMs: number): T | null {
  if (!isClient) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    let data: Partial<CacheEntry<T>>;
    try {
      data = JSON.parse(raw);
    } catch {
      localStorage.removeItem(key);
      return null;
    }
    if (!data || data.value === undefined) return null;
    if (data.timestamp && Date.now() - data.timestamp > ttlMs) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value as T;
  } catch {
    return null;
  }
}

export function setCache(key: string, value: unknown): void {
  if (!isClient) return;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ value, timestamp: Date.now() }),
    );
  } catch {}
}
