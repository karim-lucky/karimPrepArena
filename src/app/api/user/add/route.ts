import { NextRequest, NextResponse } from 'next/server';
// import { addUserSchema } from '@/components/lib/ZodSchema'; // adjust path if needed
 
import User from '@/models/user/userModal';
import bcrypt from 'bcryptjs';
import { addUserSchema } from '@/components/lib/ZodSchema/addUserSchema';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const formValues = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      educationLevel: formData.get('educationLevel')?.toString() || '',
      targetExams: formData.get('targetExams')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      profileImage: formData.get('profileImage'),
    };

    // Validate with Zod
    const validation = addUserSchema.safeParse(formValues);
    if (!validation.success) {
      const formatted = validation.error.format();
      return NextResponse.json({ error: formatted }, { status: 400 });
    }

    const { name, email, phone, educationLevel, targetExams, password } = validation.data;

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const targetExamsArray = targetExams
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      educationLevel,
      targetExams: targetExamsArray,
      passwordHash,
      role: 'student',
      emailVerified: false,
    });

    return NextResponse.json({
      message: 'Student added successfully',
      user: newUser,
    });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
