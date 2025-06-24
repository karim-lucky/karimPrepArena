'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserSchema } from '@/components/lib/ZodSchema/addUserSchema';
import type { FormData } from '@/components/lib/ZodSchema/addUserSchema';

export default function AddUserPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (data.phone !== undefined) formData.append('phone', data.phone);
      formData.append('educationLevel', data.educationLevel);
      formData.append('targetExams', data.targetExams);
      formData.append('password', data.password);
      if (data.profileImage && data.profileImage[0]) {
        formData.append('profileImage', data.profileImage[0]);
      }

      const res = await fetch('/api/user/add', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Unknown error');

      alert('Student added successfully!');
      reset();
    } catch (err) {
      console.error('Failed:', err);
      alert('Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto bg-white shadow-xl rounded-2xl p-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-8">Add New Student</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input {...register('name')} placeholder="Enter full name" />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input type="email" {...register('email')} placeholder="Enter email address" />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input type="password" {...register('password')} placeholder="Enter password" />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <Label>Phone</Label>
            <Input {...register('phone')} placeholder="Optional phone number" />
          </div>

          {/* Education Level */}
          <div>
            <Label>Education Level</Label>
            <select
              {...register('educationLevel')}
              defaultValue="matric"
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="undergrad">Undergrad</option>
              <option value="postgrad">Postgrad</option>
            </select>
          </div>

          {/* Target Exams */}
          <div>
            <Label>Target Exams</Label>
            <Input {...register('targetExams')} placeholder="e.g. MDCAT, ECAT" />
            {errors.targetExams && <p className="text-sm text-red-500 mt-1">{errors.targetExams.message}</p>}
          </div>

          {/* Profile Image (spans full width) */}
          <div className="md:col-span-2">
            <Label>Profile Image (optional)</Label>
            <Input type="file" accept="image/*" {...register('profileImage')} />
          </div>

          {/* Action buttons (full width) */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="hover:bg-gray-100"
            >
              Reset
            </Button>
            <Button type="submit" disabled={loading} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              {loading ? 'Adding...' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
