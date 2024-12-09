"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { statutorySchema } from "@/validators/statutory-validator";
import { useAddEmpNoDetailsStore } from "@/store/addEmployeeStore";

export function StatutoryForm() {
    const EmpNo = useAddEmpNoDetailsStore((state) => state.empNo);
    const form = useForm({
        resolver: zodResolver(statutorySchema),
        defaultValues: {
            panNo: "",
            aadharNo: "",
            passportNo: "",
            uanNo: "",
        },
    });

    function onSubmit(values) {
        const formData = { ...values, EmpNo };
    }

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Statutory Information</CardTitle>
                <CardDescription>Enter the employee's statutory details.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="panNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PAN Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="PAN Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="aadharNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Aadhar Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Aadhar Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passportNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Passport Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Passport Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="uanNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>UAN Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="UAN Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
