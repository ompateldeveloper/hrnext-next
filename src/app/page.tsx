"use server";
import { useAdmin } from "@/hooks/use-admin-server";
import { redirect } from "next/navigation";
export default async function Home() {
    const admin = await useAdmin();
    if (admin) {
        redirect("/admin");
    } else {
        redirect("/user");
    }
    // return (
    //     <div>

    //         <h1>Home</h1>
    //     </div>
    // );
}
