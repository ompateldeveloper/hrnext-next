"use client";
import { LogOut, LogsIcon, MailIcon, Newspaper, UserIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import Image from "next/image";
export function AppSidebar({ items }) {
    const pathname = usePathname();
    const details = useUserStore();
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href="/" className="flex items-center gap-2">
                    <Newspaper /> {open && "Accentiqa Dashboard"}
                </Link>
            </SidebarHeader>
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
            <SidebarFooter className="p-1">
                <Popover>
                    <PopoverTrigger >
                        <Button asChild variant="ghost" className=" w-full ">
                            <div className="">
                                <div className="min-w-8 w-8 rounded-full overflow-hidden">
                                    <img src="https://github.com/ompateldeveloper.png" alt="user" />
                                </div>
                                {open && (
                                    <div className="capitalize truncate max-w-36">
                                        {details?.fname} {details?.lname}
                                    </div>
                                )}
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
                        <div className="flex items-center justify-between">
                            <Link href="/logout">
                                <Button variant="destructive">
                                    <LogOut />
                                    Logout
                                </Button>
                            </Link>
                            <ModeToggle />
                        </div>
                    </PopoverContent>
                </Popover>
            </SidebarFooter>
        </Sidebar>
    );
}
