import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecurityTab from './security-tab'
import GeneralTab from './general-tab'
import NotificationTab from './notiifications-tab'
export default function AccountSettings() {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Account Setting</h1>
            <Tabs defaultValue="general" className="w-full  gap-2 ">
                <TabsList className="h-min p-2 mr-2 mt-2 bg-none">
                    <TabsTrigger className="w-full " value="general">
                        General
                    </TabsTrigger>
                    <TabsTrigger className="w-full " value="security">
                        Security
                    </TabsTrigger>
                    <TabsTrigger className="w-full " value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="flex-1">
                    <GeneralTab/>
                </TabsContent>
                <TabsContent value="security" className="flex-1">
                    <SecurityTab/>
                </TabsContent>
                <TabsContent value="notifications" className="flex-1">
                    <NotificationTab/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
