import { redis } from "../redis";

const TTL_SECONDS = 3600;

export const blogCacheKeys = {
  publishedList: "blog:published:list",
  bySlug: (slug: string) => `blog:slug:${slug}`,
};

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    return await redis.get<T>(key);
  } catch (error) {
    console.error("[BlogCache] Read failed, falling back to DB:", error);
    return null;
  }
}

export async function setCached<T>(key: string, value: T): Promise<void> {
  try {
    await redis.set(key, value, { ex: TTL_SECONDS });
  } catch (error) {
    console.error("[BlogCache] Write failed:", error);
  }
}

export async function invalidateBlogCache(slug?: string): Promise<void> {
  try {
    const keys = [blogCacheKeys.publishedList];
    if (slug) keys.push(blogCacheKeys.bySlug(slug));
    await redis.del(...keys);
  } catch (error) {
    console.error("[BlogCache] Invalidation failed:", error);
  }
}
