import { z } from "zod"

export const positionSchema = z.object({
  empNo: z.string().min(1, "Employee Number is required"),
  grade: z.string().min(1, "Grade is required"),
  costCenter: z.string().min(1, "Cost Center is required"),
  designationId: z.string().min(1, "Designation is required"),
  locationId: z.string().min(1, "Location is required"),
  divisionId: z.string().min(1, "Division is required"),
  departmentId: z.string().min(1, "Department is required"),
  projectId: z.string().min(1, "Project is required"),
  projectDate: z.date({
    required_error: "Project Date is required",
  }),
  shiftId: z.string().min(1, "Shift is required"),
  isBillable: z.boolean(),
})

export type PositionSchema = z.infer<typeof positionSchema>

