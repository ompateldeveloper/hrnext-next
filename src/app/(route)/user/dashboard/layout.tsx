"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { Calendar, Home, Info, Settings, TentTree } from "lucide-react";

const items = [
    {
        title: "Home",
        url: "/user/dashboard/home",
        icon: Home,
    },
    {
        title: "Calendar",
        url: "/user/dashboard/calendar",
        icon: Calendar,
    },
    {
        title: "My Info",
        url: "/user/dashboard/my-info",
        icon: Info,
    },
    {
        title: "Leave management",
        url: "/user/dashboard/leave-mgmt",
        icon: TentTree,
    },
    {
        title: "Settings",
        url: "/user/dashboard/settings",
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
            <AppSidebar items={items}/>
            <div className="flex flex-col w-full">
                <Navbar />.
                <main>{children}</main>
            </div>
        </SidebarProvider>
    );
}
