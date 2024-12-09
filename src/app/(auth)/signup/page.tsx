"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { instance } from "@/lib/axios";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
    fname: z.string().min(1, {
        message: "First name shoul be atlest 1 charchter",
    }),
    lname: z.string().min(1, {
        message: "Last name shoul be atlest 1 charchter",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

export default function SignInForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fname: "",
            lname: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(formData: z.infer<typeof formSchema>) {
        instance
            .post("http://localhost:4000/api/v2/auth/signup", formData, { withCredentials: true })
            .then((res) => {
                Object.keys(res.data.data).map((key) => {
                    localStorage.setItem(String(key), res.data.data[key]);
                });
            })
            .catch((error) => {
                console.log(error);
            });
            redirect("/admin/dashboard")
    }

    return (
        <div className="flex flex-row-reverse min-h-screen justify-between">
            <div className="flex items-center justify-center w-1/2 z-10 bg-white">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Enter your details to create your account</CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="fname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">
                                    Sign Up
                                </Button>
                            </CardFooter>
                        </form>
                        <div className=" flex gap-1 px-6 pb-8">
                            <div className="text-zinc-600">Already a User?</div>
                            <Link href="/signin" className="underline">
                                {" "}
                                Sign In
                            </Link>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className="hidden w-1/2 h-screen bg-gray-100  md:flex md:items-center md:justify-center">
                <svg className="h-full absolute left-0" viewBox="0 0 748 537" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_172_4)">
                        <rect width="536" height="747" transform="matrix(0 -1 1 0 0.5 536.5)" fill="white" />
                        <path d="M249.5 83.5C367.5 260.7 205.167 460.833 110.5 538H1L1 189.5L249.5 83.5L180.5 1.5H442.5H747V350.5C661.5 288.167 480.9 131.1 442.5 1.5L249.5 83.5Z" fill="#B6EA5F" />
                        <path d="M250 83.5C367.6 259.5 205 461.167 111 538H747.5V349.5C543.5 196.3 457.667 52.3333 443.5 1L250 83.5Z" fill="#225FB1" />
                    </g>
                    <defs>
                        <clipPath id="clip0_172_4">
                            <rect width="536" height="747" fill="white" transform="matrix(0 -1 1 0 0.5 536.5)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
