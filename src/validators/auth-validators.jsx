import { z } from "zod";
const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
const signUpSchema = z.object({
    fname: z.string().min(1,"Name must be min 1 charchter(s)"),
    lname: z.string().min(1,"Name must be min 1 charchter(s)"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
const changePasswordSchema = z.object({
    cpassword: z.string().min(8, "Password must be at least 8 characters long"),
    npassword: z.string().min(8, "Password must be at least 8 characters long"),
});
export { signInSchema ,signUpSchema ,changePasswordSchema};
