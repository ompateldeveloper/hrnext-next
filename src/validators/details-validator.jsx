import { z } from "zod";

const detailsSchema = z.object({
    fname: z.string().min(1,"Name must be min 1 charchter(s)"),
    lname: z.string().min(1,"Name must be min 1 charchter(s)"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(5,"Userame must be min 5 charchter(s)"),
    // language:z.string().nullable()
});

export {detailsSchema}