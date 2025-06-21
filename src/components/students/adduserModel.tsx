'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  educationLevel: string;
  targetExams: string;
  profileImage?: FileList;
  password:string;
};

export default function AddStudentDialog() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('educationLevel', data.educationLevel);
      formData.append('targetExams', data.targetExams);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new student to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label>Name</Label>
            <Input {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" {...register('password', { required: 'password is required' })} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <Label>Phone</Label>
            <Input {...register('phone')} />
          </div>

          <div>
            <Label>Education Level</Label>
            <select
              {...register('educationLevel', { required: true })}
              className="w-full border rounded px-3 py-2"
              defaultValue="matric"
            >
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="undergrad">Undergrad</option>
              <option value="postgrad">Postgrad</option>
            </select>
          </div>

          <div>
            <Label>Target Exams (comma-separated)</Label>
            <Input {...register('targetExams', { required: 'At least one exam is required' })} />
            {errors.targetExams && <p className="text-sm text-red-500">{errors.targetExams.message}</p>}
          </div>

          <div>
            <Label>Profile Image (optional)</Label>
            <Input type="file" accept="image/*" {...register('profileImage')} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
