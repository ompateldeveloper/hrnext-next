'use client'
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema} from "@/validators/auth-validators";
import { instance } from "@/lib/axios";

export default function SecurityTab() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
    });
    const onSubmit = (formData) => {
        instance
            .post("http://localhost:4000/api/auth/change-password", formData, { withCredentials: true })
            .then((res) => {
                
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and password here.</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" {...register("cpassword")} />
                        {errors.cpassword && <p className="text-red-500">{errors.cpassword.message}</p>}

                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" {...register("npassword")} />
                        {errors.npassword && <p className="text-red-500">{errors.npassword.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Update Security Settings</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
