"use client";

import * as React from "react";
import { CalendarIcon, Home, Users, UserPlus, Blocks, BarChart3, DollarSign, ArrowUpRight, ArrowDownRight, Clock, Plus } from "lucide-react";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [activeSection, setActiveSection] = React.useState("home");

    const menuItems = [
        { icon: Home, label: "Home", id: "home" },
        { icon: UserPlus, label: "Add User", id: "add-user" },
        { icon: Users, label: "View Users", id: "view-users" },
        { icon: CalendarIcon, label: "Calendar", id: "calendar" },
        { icon: Blocks, label: "Blockchain", id: "blockchain" },
    ];

    return (
        <div className="space-y-6 p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total Users" value="1,234" icon={Users} trend="up" trendValue="5.25%" />
                <MetricCard title="Revenue" value="$12,345" icon={DollarSign} trend="up" trendValue="2.5%" />
                <MetricCard title="Active Projects" value="23" icon={Blocks} trend="down" trendValue="1.5%" />
                <MetricCard title="Avg. Session Duration" value="24m 13s" icon={Clock} trend="up" trendValue="3.7%" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Action</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>New user registered</TableCell>
                                    <TableCell>john@example.com</TableCell>
                                    <TableCell>2 minutes ago</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Project created</TableCell>
                                    <TableCell>sarah@example.com</TableCell>
                                    <TableCell>1 hour ago</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Transaction completed</TableCell>
                                    <TableCell>mike@example.com</TableCell>
                                    <TableCell>3 hours ago</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add New User
                        </Button>
                        <Button>
                            <Blocks className="mr-2 h-4 w-4" />
                            Create Project
                        </Button>
                        <Button>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Generate Report
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon, trend, trendValue }: { title: string; value: string; icon: React.ElementType; trend: "up" | "down"; trendValue: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {trend === "up" ? <ArrowUpRight className="mr-1 h-4 w-4 text-green-500 inline" /> : <ArrowDownRight className="mr-1 h-4 w-4 text-red-500 inline" />}
                    <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{trendValue}</span> from last month
                </p>
            </CardContent>
        </Card>
    );
}
