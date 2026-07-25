import { useEffect, useMemo, useState } from 'react';
import { Activity, HeartPulse, Siren, Wind, Ambulance } from 'lucide-react';
import { useInterval } from '@/hooks/useInterval';
import { mockApi } from '@/services/mockApi';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { LoadingState } from '@/components/common';
import { useQuery } from '@tanstack/react-query';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function MonitoringPage() {
  const { data, isLoading } = useQuery({ queryKey: ['monitoring'], queryFn: mockApi.getMonitoring });
  const [pulse, setPulse] = useState(() => data?.heartRate ?? 84);
  const [bloodPressure, setBloodPressure] = useState(() => data?.bloodPressure ?? '128/84');
  const [icu, setIcu] = useState(() => data?.icuOccupancy ?? 78);
  const [ventilator, setVentilator] = useState(() => data?.ventilatorUsage ?? 64);
  const [queue, setQueue] = useState(() => data?.emergencyQueue ?? 7);
  const [capacity, setCapacity] = useState(() => data?.hospitalCapacity ?? 82);

  useEffect(() => {
    if (!data) return;
    setPulse(data.heartRate);
    setBloodPressure(data.bloodPressure);
    setIcu(data.icuOccupancy);
    setVentilator(data.ventilatorUsage);
    setQueue(data.emergencyQueue);
    setCapacity(data.hospitalCapacity);
  }, [data]);

  useInterval(() => {
    setPulse((value) => clamp(value + (Math.random() > 0.5 ? 1 : -1), 72, 102));
    setIcu((value) => clamp(value + (Math.random() > 0.5 ? 1 : -1), 70, 92));
    setVentilator((value) => clamp(value + (Math.random() > 0.5 ? 1 : -1), 48, 86));
    setQueue((value) => clamp(value + (Math.random() > 0.5 ? 1 : -1), 3, 12));
    setCapacity((value) => clamp(value + (Math.random() > 0.5 ? 1 : -1), 74, 94));
    setBloodPressure((current) => {
      const [systolic, diastolic] = current.split('/').map(Number);
      return `${clamp(systolic + (Math.random() > 0.5 ? 1 : -1), 114, 138)}/${clamp(diastolic + (Math.random() > 0.5 ? 1 : -1), 74, 92)}`;
    });
  }, 1800);

  const tracking = useMemo(() => [
  {
    label: 'Heart Rate',
    value: pulse,
    icon: <HeartPulse className="h-5 w-5" />,
    tone: 'danger' as const,
    suffix: 'bpm',
  },
  {
    label: 'Blood Pressure',
    value: bloodPressure,
    icon: <Activity className="h-5 w-5" />,
    tone: 'info' as const,
  },
  {
    label: 'ICU Occupancy',
    value: `${icu}%`,
    icon: <Siren className="h-5 w-5" />,
    tone: 'warning' as const,
  },
  {
    label: 'Ventilator Usage',
    value: `${ventilator}%`,
    icon: <Wind className="h-5 w-5" />,
    tone: 'primary' as const,
  },
  {
    label: 'Emergency Queue',
    value: queue,
    icon: <Ambulance className="h-5 w-5" />,
    tone: 'danger' as const,
    suffix: 'patients',
  },
  {
    label: 'Hospital Capacity',
    value: `${capacity}%`,
    icon: <Activity className="h-5 w-5" />,
    tone: 'success' as const,
  },
], [pulse, bloodPressure, icu, ventilator, queue, capacity]);

if (isLoading || !data) {
  return (
    <LoadingState
      title="Loading live monitoring"
      description="Initialising interval-based mock sensor updates and capacity views."
    />
  );
}

  return (
    <div className="space-y-6">
      <div>
        <Badge tone="danger">Live Monitoring</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Live monitoring dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Interval-based mock updates with pulse animation and responsive capacity widgets.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tracking.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="mt-2 text-3xl font-semibold text-foreground">{item.value}{'suffix' in item && item.suffix ? <span className="ml-1 text-sm font-medium text-muted-foreground">{item.suffix}</span> : null}</div>
              </div>
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                {item.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Animated progress bars</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            {[
              ['ICU occupancy', icu],
              ['Ventilator usage', ventilator],
              ['Hospital capacity', capacity],
              ['Emergency queue', queue * 9],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{label as string}</span>
                  <span className="text-muted-foreground">{value as number}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-all duration-700" style={{ width: `${Math.min(100, value as number)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Ambulance tracking UI</CardTitle></CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="rounded-[20px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),rgba(255,255,255,1))] p-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Unit A-12</span>
                <Badge tone="success">En route</Badge>
              </div>
              <div className="mt-6 h-40 rounded-2xl border border-border bg-white/60 p-4">
                <div className="relative h-full overflow-hidden rounded-[18px] bg-slate-100">
                  <div className="absolute left-6 top-1/2 h-0.5 w-[72%] -translate-y-1/2 bg-primary/60" />
                  <div className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_8px_rgba(37,99,235,0.18)] animate-pulse" />
                  <div className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-4 border-secondary bg-white" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-3 shadow-soft"><div className="text-xs text-muted-foreground">Distance</div><div className="font-semibold text-foreground">{data.ambulanceDistance.toFixed(1)} km</div></div>
                <div className="rounded-xl bg-white p-3 shadow-soft"><div className="text-xs text-muted-foreground">ETA</div><div className="font-semibold text-foreground">8 minutes</div></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}