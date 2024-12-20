"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { Calendar, Home, Settings, TentTree, UserPlus, Users } from "lucide-react";

const items = [
    {
        title: "Home",
        url: "/admin/dashboard/home",
        icon: Home,
    },
    {
        title: "Add Employee",
        url: "/admin/dashboard/add-employee",
        icon: UserPlus,
    },
    {
        title: "View employees",
        url: "/admin/dashboard/view-employees",
        icon: Users,
    },
    {
        title: "Calendar",
        url: "/admin/dashboard/calendar",
        icon: Calendar,
    },
    {
        title: "Leave management",
        url: "/admin/dashboard/leave-mgmt",
        icon: TentTree,
    },
    {
        title: "Settings",
        url: "/admin/dashboard/settings",
        icon: Settings,
    },
];
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar items={items} />
            <div className="flex flex-col w-full">
                <Navbar />
                <main>{children}</main>
            </div>
        </SidebarProvider>
    );
}
