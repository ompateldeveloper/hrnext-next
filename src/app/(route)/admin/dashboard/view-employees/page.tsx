import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AllEmployee }  from "./all-employees"
export default function page() {
  return (
      <Card className="m-4">
          <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>View and manage existing users</CardDescription>
          </CardHeader>
          <CardContent>
              <AllEmployee/>
          </CardContent>

      </Card>
  );
}