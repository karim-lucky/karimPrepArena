import User from '@/models/user/userModal';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const search = searchParams.get("search") || "";

    const query = {
      role: "student",
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    };

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // lean() for performance

    const total = await User.countDocuments(query);

    return NextResponse.json({
      message: "Users fetched successfully",
      data: users,
      total,
      status: true
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        status: false
      },
      { status: 500 }
    );
  }
}
