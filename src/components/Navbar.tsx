"use client";
import React from "react";
import { Separator } from "./ui/separator";
import { ChevronLeft, ChevronRight, Sidebar } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const sidebar = useSidebar();
    const location = usePathname();
    return (
        <div className="w-[calc(100vw-var(--sidebar-width)-1.2prem)] py-2 m-0">
            <div className="flex items-center p-3 pt-2 gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        sidebar.toggleSidebar();
                    }}
                >
                    <Sidebar />
                </Button>
                <div className="font-semibold text-primary text-lg flex items-center">
                    {location
                        .split("/")
                        .filter((f) => f !== "")
                        .map((s, i) => (
                            <div key={i} className="flex items-center gap-1 capitalize">
                                <ChevronRight />
                                {s.split("-").join(" ")}
                            </div>
                        ))}
                </div>
            </div>
            <Separator />
        </div>
    );
}
