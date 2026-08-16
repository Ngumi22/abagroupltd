// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const isDev = process.env.NODE_ENV === "development";

const applySecurityHeaders = (headers: Headers, csp: string) => {
  headers.set("Content-Security-Policy", csp);
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  );
  headers.set("X-DNS-Prefetch-Control", "off");
  headers.set("X-XSS-Protection", "1; mode=block");
};

export default function proxy(request: NextRequest) {
  const startTime = Date.now();
  const path = request.nextUrl.pathname;

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""};
    object-src 'none';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://*.imagekit.io https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://upload.imagekit.io https://*.imagekit.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  if (path.startsWith("/admin") && !getSessionCookie(request)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    const redirectResponse = NextResponse.redirect(loginUrl);
    applySecurityHeaders(
      redirectResponse.headers,
      contentSecurityPolicyHeaderValue,
    );
    return redirectResponse;
  }

  const response = NextResponse.next();

  applySecurityHeaders(response.headers, contentSecurityPolicyHeaderValue);

  const duration = Date.now() - startTime;
  if (duration > 150) {
    console.warn(`[Performance] Slow middleware: ${duration}ms for ${path}`);
  }

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
