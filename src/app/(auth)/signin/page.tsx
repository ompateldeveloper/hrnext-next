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
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

export default function SignInForm() {
    const router = useRouter();

    const updateUserDetails = useUserStore((state) => state.updateUserDetails);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(formData: z.infer<typeof formSchema>) {
        instance
            .post("http://localhost:4000/api/v2/auth/signin", formData, { withCredentials: true })
            .then((res) => {
                updateUserDetails(res.data.data);
                router.refresh();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex min-h-screen justify-between">
            <div className="flex items-center justify-center w-1/2 z-10 bg-white dark:bg-primary-foreground">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Enter your email and password to access your account.</CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-4">
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
                                    Sign In
                                </Button>
                            </CardFooter>
                        </form>
                        <div className=" flex gap-1 px-6 pb-8">
                            <div className="text-zinc-600">Not a User?</div>
                            <Link href="/signup" className="underline">
                                {" "}
                                Sign Up
                            </Link>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className="hidden w-1/2 h-screen bg-gray-100  md:flex md:items-center md:justify-center">
                <svg className="h-full absolute right-0" viewBox="0 0 748 537" fill="none" xmlns="http://www.w3.org/2000/svg">
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
