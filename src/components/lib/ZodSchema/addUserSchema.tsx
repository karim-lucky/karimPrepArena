import { z } from 'zod';

const addUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
  .string()
  .regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    'Must be a valid email format (no spaces, must contain @ and domain)'
  ),

  phone: z.string().optional(),
  educationLevel: z.enum(['matric', 'intermediate', 'undergrad', 'postgrad']),
  targetExams: z.string().min(1, 'At least one exam is required'),
  profileImage: z
    .any()
    .refine((files) => !files || files.length === 0 || files[0] instanceof File, {
      message: 'Invalid file',
    })
    .optional(),
 password: z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .refine(
    (val) =>
      /[A-Z]/.test(val) && // at least one uppercase letter
      /\d/.test(val) && // at least one digit
      /[^A-Za-z0-9]/.test(val), // at least one special character
    {
      message: 'Password must include an uppercase letter, a number, and a special character',
    }
  ),

});

type FormData = z.infer<typeof addUserSchema>;
export { addUserSchema };
export type { FormData };
