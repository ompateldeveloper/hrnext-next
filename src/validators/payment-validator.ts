import { z } from "zod"

export const paymentSchema = z.object({
  empNo: z.string().min(1, "Employee Number is required"),
  paymentType: z.enum(["bank", "cash", "cheque"], {
    required_error: "Payment Type is required",
  }),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  accHolderName: z.string().min(1, "Account Holder Name is required"),
  ifscCode: z.string().length(11, "IFSC Code must be 11 characters"),
  branchName: z.string().min(1, "Branch Name is required"),
})

export type PaymentSchema = z.infer<typeof paymentSchema>

