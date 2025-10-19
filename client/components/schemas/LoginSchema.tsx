import { z } from "zod";

export const LoginSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type FormFields = z.infer<typeof LoginSchema>;
