import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { message: "Missing ID token." },
        { status: 400 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { message: "Unauthorized admin account." },
        { status: 403 }
      );
    }

    const response = NextResponse.json(
      { message: "Admin session created." },
      { status: 200 }
    );

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin session error:", error);

    return NextResponse.json(
      { message: "Failed to create admin session." },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { message: "Admin session removed." },
    { status: 200 }
  );

  response.cookies.set("admin-auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}