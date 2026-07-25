import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, BedDouble, Brain, CalendarDays, DollarSign, Hospital, Stethoscope, TriangleAlert, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartFrame } from '@/components/charts';
import { AnimatedNumber, LoadingState } from '@/components/common';
import { StatCard } from '@/components/common/stat-card';
import { mockApi } from '@/services/mockApi';
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { currency, shortDate, timeLabel } from '@/utils/format';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: mockApi.getDashboard });

  if (isLoading || !data) return <LoadingState title="Loading CareScope dashboard" description="Preparing mock hospital analytics and operational insights." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge tone="success">Hospital Intelligence</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">Healthcare analytics dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground lg:text-base">
            Realistic mock operations data for patients, appointments, beds, revenue, and clinical activity across the hospital network.
          </p>
        </div>
        <Button className="self-start gap-2">
          Review today's alerts
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {[
          { label: 'Total Patients', value: <AnimatedNumber value={data.totalPatients} />, icon: <Users className="h-5 w-5" />, tone: 'primary' as const, delta: '+12.4% this month' },
          { label: 'Appointments', value: <AnimatedNumber value={data.appointments} />, icon: <CalendarDays className="h-5 w-5" />, tone: 'info' as const, delta: '+8.2% this week' },
          { label: 'Doctors', value: <AnimatedNumber value={data.doctors} />, icon: <Stethoscope className="h-5 w-5" />, tone: 'success' as const, delta: '20 active specialists' },
          { label: 'Revenue', value: currency(data.revenue), icon: <DollarSign className="h-5 w-5" />, tone: 'warning' as const, delta: 'Stable quarterly growth' },
          { label: 'ICU Beds', value: <AnimatedNumber value={data.icuBeds} />, icon: <BedDouble className="h-5 w-5" />, tone: 'danger' as const, delta: '4 beds available' },
          { label: 'Emergency Cases', value: <AnimatedNumber value={data.emergencyCases} />, icon: <TriangleAlert className="h-5 w-5" />, tone: 'danger' as const, delta: 'Requires close monitoring' },
          { label: 'Bed Occupancy', value: `${data.bedOccupancy}%`, icon: <Hospital className="h-5 w-5" />, tone: 'primary' as const, delta: 'Healthy utilization' },
        ].map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} delta={item.delta} icon={item.icon} tone={item.tone} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartFrame title="Patients Growth" description="New admissions and active population growth.">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.patientGrowth}>
              <defs>
                <linearGradient id="patientsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.36} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Tooltip />
              <Area type="monotone" dataKey="patients" stroke="#2563EB" fillOpacity={1} fill="url(#patientsGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartFrame>

        <ChartFrame title="Appointments" description="Completed vs pending appointment trends.">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.appointmentTrend}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#2563EB" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#1D4ED8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartFrame title="Disease Distribution" description="Current diagnostic mix across the hospital." legend={data.diseaseDistribution.map((item) => ({ label: item.name, color: item.color }))}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.diseaseDistribution} dataKey="value" nameKey="name" innerRadius={72} outerRadius={110} paddingAngle={4}>
                {data.diseaseDistribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartFrame>

        <ChartFrame title="Revenue Trend" description="Monthly revenue performance from mock billing data.">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenueTrend}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={56} />
              <Tooltip formatter={(value) => currency(Number(value))} />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartFrame>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Health Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-5xl font-semibold tracking-tight text-foreground"><AnimatedNumber value={data.healthScore} suffix="%" /></div>
                <div className="mt-2 text-sm text-muted-foreground">Overall care quality and operational resilience.</div>
              </div>
              <Badge tone="success">Excellent</Badge>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <motion.div initial={{ width: 0 }} animate={{ width: `${data.healthScore}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.quickActions.map((action) => (
                <div key={action.label} className="rounded-[16px] border border-border bg-background p-4">
                  <div className="font-medium text-foreground">{action.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{action.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-5">
              {data.recentActivities.map((item) => (
                <div key={item.title} className="border-l-2 border-primary/30 pl-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.detail}</div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Upcoming Appointments</CardTitle></CardHeader>
            <CardContent className="space-y-3 p-5">
              {data.upcomingAppointments.slice(0, 4).map((appointment) => (
                <div key={appointment.id} className="rounded-[16px] border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-foreground">{appointment.patientName}</div>
                      <div className="text-sm text-muted-foreground">{appointment.doctor}</div>
                    </div>
                    <Badge tone="info">{appointment.status}</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{shortDate(appointment.date)}</span>
                    <span>{timeLabel(`${appointment.date}T${appointment.time}:00`)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}