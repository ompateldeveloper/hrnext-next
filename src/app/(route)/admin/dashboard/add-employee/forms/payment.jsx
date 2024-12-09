"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { paymentSchema } from "@/validators/payment-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddEmpNoDetailsStore } from "@/store/addEmployeeStore";

export function PaymentForm() {
    const EmpNo = useAddEmpNoDetailsStore((state) => state.empNo);
    const form = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            paymentType: "",
            bankName: "",
            accountNumber: "",
            accHolderName: "",
            ifscCode: "",
            branchName: "",
        },
    });

    function onSubmit(values) {
        const formData = { ...values, EmpNo };
    }

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter the employee's payment details.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="paymentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select payment type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="bank">Bank Transfer</SelectItem>
                                                <SelectItem value="cash">Cash</SelectItem>
                                                <SelectItem value="cheque">Cheque</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bankName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Bank Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="accountNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Account Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="accHolderName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Holder Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Account Holder Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ifscCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>IFSC Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="IFSC Code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="branchName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Branch Name" {...field} />
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
