import ChartHeader from "@/components/ChartHeader";
import EventCalendar from "@/components/EventCalendar";
import EventList from "@/components/EventList";

export default async function EventCalendarContainer({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { date } = searchParams;

  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />

      <div className="flex flex-col gap-4 mt-4">
        <ChartHeader title="Events" />

        <EventList dateParam={date} />
      </div>
    </div>
  );
}
