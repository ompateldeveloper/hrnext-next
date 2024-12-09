"use client";
import { redirect, useRouter } from "next/navigation";
export default function page() {
    // const router = useRouter();
    
    redirect("/admin/dashboard/home");
}