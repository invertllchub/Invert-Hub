import { z } from "zod";

export const EditProjectSchema = z.object({
    projectName: z.string().min(3, "Name is required"),
    projectDescription: z.string().min(10, "Description is required"),
    projectImage: z
        .any() 
        .refine(
            file => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            { message: "Only JPG, PNG, or WEBP files are allowed" }
        ),
    projectLink: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid URL")
});

export type FormFields = z.infer<typeof EditProjectSchema>;
