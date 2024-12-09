import { z } from "zod"

export const statutorySchema = z.object({
  empNo: z.string().min(1, "Employee Number is required"),
  panNo: z.string().length(10, "PAN Number must be 10 characters"),
  aadharNo: z.string().length(12, "Aadhar Number must be 12 digits"),
  passportNo: z.string().min(8, "Passport Number must be at least 8 characters"),
  uanNo: z.string().min(12, "UAN Number must be at least 12 characters"),
})

export type StatutorySchema = z.infer<typeof statutorySchema>

