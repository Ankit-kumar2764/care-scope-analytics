import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { addDays, endOfMonth, format, startOfMonth } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, UserRound } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { LoadingState } from '@/components/common';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { shortDate } from '@/utils/format';

export default function AppointmentsPage() {



  const { data, isLoading } = useQuery({ queryKey: ['appointments'], queryFn: mockApi.getAppointments });
  const [monthDate, setMonthDate] = useState(new Date());

  const monthAppointments = useMemo(() => {
  if (!data) return [];

  return data.filter(
    (appointment) =>
      format(new Date(appointment.date), "yyyy-MM") ===
      format(monthDate, "yyyy-MM")
  );
}, [data, monthDate]);

const days = useMemo(() => {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const count = end.getDate();

  return Array.from(
    { length: count },
    (_, index) => addDays(start, index)
  );
}, [monthDate]);

if (isLoading || !data) {
  return (
    <LoadingState
      title="Loading scheduling module"
      description="Building the month calendar, doctor availability, and appointment cards."
    />
  );
}



  const upcoming = data.filter((appointment) => appointment.status === 'Confirmed').slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge tone="info">Scheduling</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Appointment scheduling</h1>
          <p className="mt-2 text-sm text-muted-foreground">Fully responsive calendar, doctor availability, and mock patient booking flows.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button tone="outline" onClick={() => setMonthDate((current) => addDays(current, -31))}><ChevronLeft className="h-4 w-4" /></Button>
          <Button tone="outline" onClick={() => setMonthDate(new Date())}>Today</Button>
          <Button tone="outline" onClick={() => setMonthDate((current) => addDays(current, 31))}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>{format(monthDate, 'MMMM yyyy')}</CardTitle>
              <Badge tone="success">Responsive Calendar</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <div key={day}>{day}</div>)}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {days.map((day) => {
                const dayLabel = format(day, 'yyyy-MM-dd');
                const appointmentsForDay = data.filter((appointment) => appointment.date === dayLabel);
                return (
                  <div key={dayLabel} className="min-h-28 rounded-[16px] border border-border bg-background p-3">
                    <div className="text-sm font-semibold text-foreground">{format(day, 'd')}</div>
                    <div className="mt-2 space-y-2">
                      {appointmentsForDay.slice(0, 2).map((appointment) => (
                        <div key={appointment.id} className="rounded-xl bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">{appointment.time} · {appointment.patientName}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Doctor availability</CardTitle></CardHeader>
            <CardContent className="space-y-3 p-5">
              {['Dr. Olivia Carter - Available now', 'Dr. Nathan Lewis - In surgery', 'Dr. Sophia Patel - Rounds', 'Dr. Liam Brown - Clinic'].map((doctor) => (
                <div key={doctor} className="flex items-center justify-between rounded-[16px] border border-border bg-background p-4 text-sm">
                  <span className="font-medium text-foreground">{doctor}</span>
                  <Badge tone="success">Open</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Upcoming appointments</CardTitle></CardHeader>
            <CardContent className="space-y-3 p-5">
              {upcoming.map((appointment) => (
                <div key={appointment.id} className="rounded-[16px] border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-foreground">{appointment.patientName}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{appointment.doctor}</div>
                    </div>
                    <Badge tone={appointment.status === 'Completed' ? 'success' : appointment.status === 'Cancelled' ? 'danger' : 'info'}>{appointment.status}</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> {appointment.time}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {shortDate(appointment.date)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment cards</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 p-5">
          {monthAppointments.slice(0, 6).map((appointment) => (
            <div key={appointment.id} className="rounded-[18px] border border-border bg-background p-4 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-foreground">{appointment.patientName}</div>
                  <div className="text-sm text-muted-foreground">{appointment.department}</div>
                </div>
                <Badge tone={appointment.status === 'Completed' ? 'success' : appointment.status === 'Cancelled' ? 'danger' : 'warning'}>{appointment.status}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>{shortDate(appointment.date)}</span>
                <span className="inline-flex items-center gap-1"><UserRound className="h-4 w-4" /> {appointment.mode}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}