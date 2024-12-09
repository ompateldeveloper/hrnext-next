"use client";
import { instance } from "@/lib/axios";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
    instance
        .post("/api/v2/auth/logout")
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch(() => {
            return;
        });
    localStorage.clear();
    redirect("/signin");
    return <div>Logging out...</div>;
}
