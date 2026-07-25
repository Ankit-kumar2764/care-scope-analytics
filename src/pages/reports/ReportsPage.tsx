import { useQuery } from '@tanstack/react-query';
import { Download, FileSpreadsheet, FileText, Filter } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { mockApi } from '@/services/mockApi';
import { LoadingState } from '@/components/common';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ChartFrame } from '@/components/charts';
import { shortDate } from '@/utils/format';

export default function ReportsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['report-items'], queryFn: mockApi.getReportItems });

  if (isLoading || !data) return <LoadingState title="Loading reports module" description="Preparing export controls, analytics, responsive cards, and mock tables." />;

  const chartData = [
    { name: 'Cardiology', value: 28 },
    { name: 'Neurology', value: 22 },
    { name: 'ICU', value: 18 },
    { name: 'Emergency', value: 26 },
    { name: 'Radiology', value: 14 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge tone="info">Analytics Reports</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Reports module</h1>
          <p className="mt-2 text-sm text-muted-foreground">Export PDF/Excel UI, filters, analytics cards, and responsive mock tables.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button tone="outline"><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
          <Button tone="outline"><FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel</Button>
          <Button><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {['Department', 'Doctor', 'Date', 'Patient'].map((field) => (
          <select key={field} className="h-11 rounded-xl border border-input bg-card px-4 text-sm shadow-soft"><option>{field}</option></select>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartFrame title="Department analytics" description="Mock report totals by department.">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563EB" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>

        <Card>
          <CardHeader><CardTitle>Responsive cards</CardTitle></CardHeader>
          <CardContent className="grid gap-3 p-5 md:grid-cols-2">
            {['Summary', 'Clinical', 'Billing', 'Capacity'].map((item) => (
              <div key={item} className="rounded-[16px] border border-border bg-background p-4">
                <div className="text-sm font-medium text-foreground">{item}</div>
                <div className="mt-2 text-3xl font-semibold text-foreground">{Math.floor(Math.random() * 90) + 10}</div>
                <div className="mt-1 text-sm text-muted-foreground">Mock report insight card</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Report table</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto p-5">
          <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <th className="px-4 py-3">Report</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 12).map((item) => (
                <tr key={item.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-4 font-medium text-foreground">{item.title}</td>
                  <td className="px-4 py-4 text-muted-foreground">{item.department}</td>
                  <td className="px-4 py-4 text-muted-foreground">{item.doctor}</td>
                  <td className="px-4 py-4 text-muted-foreground">{item.patient}</td>
                  <td className="px-4 py-4 text-muted-foreground">{shortDate(item.date)}</td>
                  <td className="px-4 py-4"><Badge tone={item.status === 'Critical' ? 'danger' : item.status === 'Reviewed' ? 'success' : 'info'}>{item.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}