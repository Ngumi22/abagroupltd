import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const url = process.env["UPSTASH_REDIS_REST_URL"];
const token = process.env["UPSTASH_REDIS_REST_TOKEN"];

const redis = url && token ? new Redis({ url, token }) : undefined;

export const globalRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(10, "10 m"),
      prefix: "rl:global",
      analytics: true,
    })
  : undefined;

export const uploadAuthRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(20, "10 m"),
      prefix: "rl:upload",
    })
  : undefined;

export const authRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(5, "15 m"),
      prefix: "rl:auth",
    })
  : undefined;

class SimpleRateLimiter {
  private store = new Map<string, { count: number; reset: number }>();
  private max: number;
  private window: number;
  private name: string;

  constructor(max: number, windowMs: number, name: string) {
    this.max = max;
    this.window = windowMs;
    this.name = name;

    if (typeof window === "undefined") {
      setInterval(() => {
        const now = Date.now();
        for (const [key, record] of this.store.entries()) {
          if (now > record.reset) this.store.delete(key);
        }
      }, 300_000);
    }
  }

  async limit(key: string) {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || now > record.reset) {
      const reset = now + this.window;
      this.store.set(key, { count: 1, reset });
      return {
        success: true,
        limit: this.max,
        remaining: this.max - 1,
        reset,
      };
    }

    if (record.count >= this.max) {
      console.warn(`[RateLimit:${this.name}] BLOCKED key=${key}`);
      return {
        success: false,
        limit: this.max,
        remaining: 0,
        reset: record.reset,
      };
    }

    record.count++;
    return {
      success: true,
      limit: this.max,
      remaining: this.max - record.count,
      reset: record.reset,
    };
  }
}

export const fallbackGlobalRateLimiter = new SimpleRateLimiter(
  10,
  60000,
  "global",
);

export const fallbackUploadAuthRateLimiter = new SimpleRateLimiter(
  20,
  60000,
  "upload",
);

export const fallbackAuthRateLimiter = new SimpleRateLimiter(5, 900000, "auth");
