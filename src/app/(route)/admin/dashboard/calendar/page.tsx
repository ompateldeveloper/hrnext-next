import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarSection({ date, setDate }: { date?: Date; setDate: (date?: Date) => void }) {
  return (
      <Card>
          <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View and manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
      </Card>
  );
}