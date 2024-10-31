import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { useMails } from "@/queries/mail.query";
import { Button } from "@/components/ui/button";
import MutationMail from "@/components/home/mutation-mail";

const localizer = dayjsLocalizer(dayjs);

export default function Home() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data } = useMails();

  const events = data?.data?.map((mail: any) => ({
    id: mail.id,
    title: mail.email,
    start: dayjs(mail.date).startOf("day").toDate(),
    end: dayjs(mail.date).endOf("day").toDate(),
    date: mail.date,
    description: mail.description,
  }));

  const handleSelectEvent = useCallback((event: any) => {
    setEditData(event);
    setOpen(true);
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="w-full max-w-screen-lg mx-auto py-12">
        <div className="flex justify-end">
          <Button onClick={() => setOpen(true)}>Create</Button>
        </div>

        <div className="mt-5">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "80vh" }}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>

      <MutationMail
        open={open}
        editData={editData}
        onOpenChange={(newVal) => {
          if (!newVal) {
            setEditData(null);
            setOpen(newVal);
          } else {
            setOpen(newVal);
          }
        }}
      />
    </div>
  );
}
