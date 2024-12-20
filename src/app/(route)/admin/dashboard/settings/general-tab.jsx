"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CameraIcon } from "lucide-react";
import useUserStore from "@/store/userStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { detailsSchema } from "@/validators/details-validator";
import { instance } from "@/lib/axios";
import { toast } from "sonner";
export default function GeneralTab() {
    const [base64Image, setBase64Image] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    };

    // const handleUpload = async () => {
    //     try {
    //         const response = await instance.post("/api/details/profile-picture", {
    //             picture: base64Image,
    //         });
    //         console.log("Upload Successful:", response.data);
    //     } catch (error) {
    //         console.error("Upload Failed:", error);
    //     }
    // };
    // useEffect(() => {
    //     if (base64Image) {
    //         handleUpload();
    //     }
    // }, [base64Image]);
    const { fname, lname, email, username, language, updateUserDetails } = useUserStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(detailsSchema),
    });
    useEffect(() => {
        // Set the form default values
        setValue("fname", fname);
        setValue("lname", lname);
        setValue("email", email);
        setValue("username", username);
        setValue("language", language);
    }, [fname, lname, email, username, language, setValue]);

    const onSubmit = (formData) => {
        instance
            .post("/api/details", formData, { withCredentials: true })
            .then((res) => {
                updateUserDetails(res.data.data);
                toast(res.data.message);
            })
            .catch((error) => {
                console.log(error);
                toast(error.response.data.error);
            });
    };

    
    return (
        <Card>
            <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <div className="flex flex-col items-center p-2 space-y-4">
                <Avatar className="w-32 h-32">
                    <AvatarImage src="https://github.com/ompateldeveloper.png" alt="Profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="relative">
                    <Button>
                        <Input type="file" id="avatar-upload" className="sr-only" accept="image/*" onChange={handleFileChange} />
                        <Label htmlFor="avatar-upload" className="flex items-center">
                            <CameraIcon className="w-4 h-4 mr-2" />
                            Change Picture
                        </Label>
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="John" {...register("fname")} />
                            {errors.fname && <p className="text-red-500">{errors.fname.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Doe" {...register("lname")} />
                            {errors.lname && <p className="text-red-500">{errors.lname.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="john.doe@example.com" readOnly type="email" {...register("email")} />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="johndoe" {...register("username")} />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select>
                            <SelectTrigger id="language" {...register("language")}>
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.language && <p className="text-red-500">{errors.language.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
