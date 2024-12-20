// 'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
export default function NotificationTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Switch id="emailNotifications" />
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="pushNotifications" />
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="smsNotifications" />
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="marketingEmails" />
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Notification Preferences</Button>
            </CardFooter>
        </Card>
    );
}
