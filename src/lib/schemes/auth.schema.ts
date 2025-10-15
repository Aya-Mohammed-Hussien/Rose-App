import * as z from 'zod';

// Login schema
const loginSchema = z.object({
  email: z.string().nonempty('Please enter your email').email('Please enter a valid email address'),
  password: z.string().min(1, 'Your password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;
export { loginSchema };
export type { LoginValues };
