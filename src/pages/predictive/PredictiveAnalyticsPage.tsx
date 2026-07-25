import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PolarGrid, PolarAngleAxis } from 'recharts';
import { BrainCircuit, TrendingUp, ShieldAlert, Activity } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { LoadingState } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { ChartFrame } from '@/components/charts';
import { AnimatedNumber } from '@/components/common';

export default function PredictiveAnalyticsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['forecast'], queryFn: mockApi.getForecast });

  if (isLoading || !data) return <LoadingState title="Loading predictive analytics" description="Generating mock AI-inspired forecasts, risk analysis, and occupancy trends." />;

  const riskData = [
    { label: 'Low', value: 42, color: '#22C55E' },
    { label: 'Moderate', value: 28, color: '#0EA5E9' },
    { label: 'High', value: 18, color: '#F59E0B' },
    { label: 'Critical', value: 12, color: '#DC2626' },
  ];

  const diseaseForecast = [
    { month: 'Jan', disease: 12, recovery: 48, occupancy: 64 },
    { month: 'Feb', disease: 18, recovery: 52, occupancy: 68 },
    { month: 'Mar', disease: 20, recovery: 58, occupancy: 70 },
    { month: 'Apr', disease: 24, recovery: 61, occupancy: 74 },
    { month: 'May', disease: 29, recovery: 66, occupancy: 77 },
    { month: 'Jun', disease: 31, recovery: 70, occupancy: 79 },
  ];

  const heatmap = Array.from({ length: 24 }, (_, index) => ({
    label: `H${index + 1}`,
    value: 20 + (index % 6) * 12 + (index % 3) * 8,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Badge tone="info">AI Predictions</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Predictive analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground">Charts only, powered by mock datasets and designed for premium healthcare forecasting views.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Disease Prediction', 84, <BrainCircuit className="h-5 w-5" />],
          ['Recovery Trend', 92, <TrendingUp className="h-5 w-5" />],
          ['Occupancy Forecast', 78, <Activity className="h-5 w-5" />],
          ['Risk Analysis', 67, <ShieldAlert className="h-5 w-5" />],
        ].map(([label, value, icon]) => (
          <Card key={label as string}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <div className="text-sm text-muted-foreground">{label as string}</div>
                <div className="mt-2 text-3xl font-semibold text-foreground"><AnimatedNumber value={value as number} suffix="%" /></div>
              </div>
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">{icon as ReactNode}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartFrame title="Monthly Forecast" description="Forecast graph with growth and occupancy projections.">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={diseaseForecast}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Tooltip />
              <Area type="monotone" dataKey="occupancy" stroke="#2563EB" fillOpacity={1} fill="url(#forecastGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartFrame>

        <ChartFrame title="Recovery Trend" description="Faster patient recovery with higher throughput.">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={diseaseForecast}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <Tooltip />
              <Bar dataKey="recovery" radius={[10, 10, 0, 0]} fill="#1D4ED8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartFrame title="Risk Analysis" description="AI-style risk segmentation by mock patient cohorts.">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={riskData} dataKey="value" nameKey="label" innerRadius={70} outerRadius={118} paddingAngle={3}>
                {riskData.map((entry) => <Cell key={entry.label} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartFrame>

        <Card>
          <CardHeader><CardTitle>Heatmap</CardTitle></CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-6 gap-2">
              {heatmap.map((item) => (
                <div key={item.label} className="group rounded-2xl border border-border p-3 transition hover:scale-[1.02]">
                  <div className="flex h-16 items-end rounded-xl bg-muted/25 p-2">
                    <div className="w-full rounded-lg bg-gradient-to-t from-primary to-info" style={{ height: `${item.value}%` }} />
                  </div>
                  <div className="mt-2 text-center text-[11px] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ChartFrame title="Hospital Occupancy" description="Area chart showing predicted occupancy trends.">
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={diseaseForecast}>
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.25)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <Tooltip />
            <Area type="monotone" dataKey="occupancy" stroke="#0EA5E9" fillOpacity={1} fill="url(#occupancyGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}