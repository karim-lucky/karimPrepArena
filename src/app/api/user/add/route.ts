import { NextRequest, NextResponse } from 'next/server';

import User from '@/models/user/userModal';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {


        const formData = await req.formData();

        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const phone = formData.get('phone')?.toString() || '';
        const educationLevel = formData.get('educationLevel')?.toString() || '';
        const targetExamsRaw = formData.get('targetExams')?.toString() || '';
        const password = formData.get("password")?.toString() || '';

        if (!name || !email || !educationLevel || !targetExamsRaw) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        const targetExams = targetExamsRaw
            .split(',')
            .map((e) => e.trim())
            .filter(Boolean);
        console.log(formData)
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)

        const newUser = await User.create({
            name,
            email,
            phone,
            educationLevel,
            targetExams,
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
