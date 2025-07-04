import { addDays } from "date-fns";

import { Calendar } from "@madooei/shadcn-all-in-one/calendar";
import { Card, CardContent } from "@madooei/shadcn-all-in-one/card";

const start = new Date(2023, 5, 5);

export function CardsCalendar() {
  return (
    <Card className="mx-auto w-fit sm:w-full overflow-auto">
      <CardContent className="p-0">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </CardContent>
    </Card>
  );
}
