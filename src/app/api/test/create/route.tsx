import { Test } from "@/models/test/testModel";
import { NextResponse } from "next/server";





export async function POST(request: Request) {
  const data = await request.json();

  if(data)
  {
    console.log("dddddddddddddddddddddddddddddddddddd")
    console.log("Received data:", data);
    const test = new Test(data);
    await test.save();
    return  NextResponse.json({ message: "Test created successfully", test }, { status: 201 });
  }
    return NextResponse.json({ message: "Failed to create test" }, { status: 500 });


  





}