import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Users from "@/models/users/userModel";
 
 

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const { name, email, password, role, institute, contact } = body;

    // Check existing user
    const existing = await Users.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine approval
    const isApproved = role === "ADMIN" ? true : false;

    // Create user
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
      institute: role === "STUDENT" ? institute : null,
      contact: role === "STUDENT" ? contact : null,
      isApproved,
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        isApproved: newUser.isApproved,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
