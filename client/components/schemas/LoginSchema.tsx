import {z} from 'zod';

export const LoginSchema = z.object({
    userName: z
    .string("Username is required")
    .min(5, "Username must be at least 5 characters long"),
    password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
})

export type FormFields = z.infer<typeof LoginSchema>