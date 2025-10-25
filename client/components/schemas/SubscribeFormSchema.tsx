import { z } from "zod"

export const SubscribeFormSchema = z.object({
    email: z.email("Email is required")
})

export type FormFields = z.infer<typeof SubscribeFormSchema>