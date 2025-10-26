import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userName, password } = await req.json();

  if (userName === "admin" && password === "12345678") {
    return NextResponse.json({ token: "demo-token-123" });
  }

  return NextResponse.json(
    { message: "Your user name or password is not right" },
    { status: 401 }
  );
}
