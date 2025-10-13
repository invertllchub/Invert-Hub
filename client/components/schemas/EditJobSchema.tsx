import { z } from "zod";

export const EditJobSchema = z.object({
    title: z.string().min(3, "Title is required"),
    location: z.string().min(2, "Location is required"),
  
    employmentType: z
        .enum(["Full-time", "Part-time", "Contract"])
        .refine((val) => !!val, { message: "Employment Type is required" }),

    experienceLevel: z
        .enum(["Junior", "Mid-level", "Senior"])
        .refine((val) => !!val, { message: "Experience Level is required" }),

    salary: z.string().min(1, "Salary must be greater than 0"),

    status: z
        .enum(["Available", "Not Available"])
        .refine((val) => !!val, { message: "Status is required" }),

    datePosted: z.string().nonempty("Date Posted is required"),
    closingDate: z.string().nonempty("Closing Date is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    requirements: z.string().min(10, "Please list at least one requirement"),
    skills: z.string().min(3, "Please list at least one skills"),
    benefits: z.string().min(5, "Please list at least one benefit"),
});

export type FormFields = z.infer<typeof EditJobSchema>;
