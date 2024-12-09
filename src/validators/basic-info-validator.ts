import { z } from "zod";

export const basicInfoSchema = z.object({
    // empSeries: z.string().min(1, "Employee Series is required"),
    probationPeriod: z.string().min(1, "Probation Period is required"),
    // empNo: z.string().min(1, "Employee Number is required"),
    confirmDate: z.date({
        required_error: "Confirmation Date is required",
    }),
    fname: z.string().min(1, "First Name is required"),
    lname: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    dob: z.date({
        required_error: "Date of Birth is required",
    }),
    mobileNo: z.string().min(10, "Mobile Number must be at least 10 digits"),
    aadharNo: z.string().length(12, "Aadhar Number must be 12 digits"),
    emergencyName: z.string().min(1, "Emergency Contact Name is required"),
    gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
    }),
    emergencyNo: z.string().min(10, "Emergency Number must be at least 10 digits"),
    reportingMgId: z.string().min(1, "Reporting Manager ID is required"),
    fathersName: z.string().min(1, "Father's Name is required"),
    status: z.enum(["active", "inactive", "onLeave"], {
        required_error: "Status is required",
    }),
    spouseName: z.string().optional(),
    doj: z.date({
        required_error: "Date of Joining is required",
    }),
    salary: z.number().positive("Salary must be a positive number"),
});

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>;
