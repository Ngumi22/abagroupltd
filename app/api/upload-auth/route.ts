import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import {
  requirePermission,
  type PermissionMap,
} from "@/lib/auth/require-permission";

const MAX_BATCH = 20;

const RESOURCE_PERMISSIONS: Record<string, PermissionMap> = {
  blog: { blog: ["create"] },
  project: { project: ["create"] },
  contactInfo: { contactInfo: ["create"] },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (!resource || !(resource in RESOURCE_PERMISSIONS)) {
    return NextResponse.json(
      { error: "Missing or unknown 'resource' query param" },
      { status: 400 },
    );
  }

  try {
    await requirePermission(RESOURCE_PERMISSIONS[resource]);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unauthorized";
    const status = message === "Forbidden" ? 403 : 401;
    return NextResponse.json({ error: message }, { status });
  }

  const requested = Number(searchParams.get("count")) || 1;
  const count = Math.min(Math.max(requested, 1), MAX_BATCH);

  const params = Array.from({ length: count }, () =>
    getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    }),
  );

  return NextResponse.json({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    params,
  });
}
