"use client";
import { Calendar, Home, Inbox, LogOut, MailIcon, Search, Settings, TentTree, UserIcon, UserPlus, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/store/userStore";
import { instance } from "@/lib/axios";
import Link from "next/link";

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
        url: "/admin/dashboard",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const details = useUserStore();

    return (
        <Sidebar>
            <SidebarHeader>Accentiqa Admin</SidebarHeader>
            {/* <Separator /> */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Popover>
                    <PopoverTrigger>
                        <Button asChild variant="ghost" className="h-fit w-full">
                            <div className="flex items-center gap-2 ">
                                <Avatar>
                                    <AvatarImage src="https://github.com/ompateldeveloper.png" />
                                </Avatar>
                                <div className="capitalize truncate max-w-36">
                                    {details?.fname} {details?.lname}
                                </div>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-2">
                        <div className="m-3 space-y-3">
                            <div className="flex items-center space-x-4">
                                <UserIcon className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium leading-none">Name</p>
                                    <p className="text-sm text-muted-foreground">
                                        {details?.fname} {details?.lname}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MailIcon className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium leading-none">Email</p>
                                    <p className="text-sm text-muted-foreground">{details?.email}</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/logout">
                            <Button variant="destructive">
                                <LogOut />
                                Logout
                            </Button>
                        </Link>
                    </PopoverContent>
                </Popover>
            </SidebarFooter>
        </Sidebar>
    );
}
