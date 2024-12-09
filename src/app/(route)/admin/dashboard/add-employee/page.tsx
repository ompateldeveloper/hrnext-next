"use client";
import { BasicInfoForm } from "./forms/basic-info";
import { StatutoryForm } from "./forms/statutory";
import { PositionForm } from "./forms/position";
import { PaymentForm } from "./forms/payment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAddEmpNoDetailsStore } from "@/store/addEmployeeStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function page() {
    const updateEmpNoDetails = useAddEmpNoDetailsStore((state) => state.updateEmpNoDetails);
    
    const form = useForm({
        defaultValues: {
            empSeries: "",
            empNo: "",
        },
    });
    const empNo = form.watch("empNo");
    const empSeries = form.watch("empSeries");
    useEffect(() => {
        updateEmpNoDetails({ empNo, empSeries });
    }, [empNo, empSeries]);
    return (
        <div className="md:w-full-sidebar p-4 space-y-4 ">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle>Employee No</CardTitle>
                    <CardDescription>Enter the employee number and select the series.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="empSeries"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee Series</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select employee series" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="automatic">Automatic</SelectItem>
                                                    <SelectItem value="manual">Manual</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="empNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Employee Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <BasicInfoForm />
            <StatutoryForm />
            <PositionForm />
            <PaymentForm />
        </div>
    );
}
