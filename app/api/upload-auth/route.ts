import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { requireDashboardUser } from "@/lib/auth/require-dashboard-user";

const MAX_BATCH = 20;

export async function GET(request: Request) {
  try {
    await requireDashboardUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
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
