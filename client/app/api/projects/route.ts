// app/api/projects/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("📥 Received project:", body);
  return NextResponse.json({ success: true });
}
