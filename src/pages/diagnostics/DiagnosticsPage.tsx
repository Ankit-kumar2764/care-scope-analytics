import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Eye, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { mockApi } from '@/services/mockApi';
import { LoadingState } from '@/components/common';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { shortDate } from '@/utils/format';

export default function DiagnosticsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['diagnostic-reports'], queryFn: mockApi.getReports });
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);

  if (isLoading || !data) return <LoadingState title="Loading diagnostic reports" description="Fetching mock blood tests, MRI, CT, ECG, X-Ray, and lab reports." />;

  const filtered = useMemo(() => data.filter((report) => (type === 'All' || report.type === type) && (status === 'All' || report.status === status)), [data, type, status]);
  const active = filtered.find((report) => report.id === selected) ?? filtered[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge tone="info">Modern Report Viewer</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Diagnostic reports</h1>
          <p className="mt-2 text-sm text-muted-foreground">Preview, filter, and download mock medical reports with a polished grid layout.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button tone="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          <Button><Download className="mr-2 h-4 w-4" /> Download selected</Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <select value={type} onChange={(event) => setType(event.target.value)} className="h-11 rounded-xl border border-input bg-card px-4 text-sm shadow-soft"><option>All</option>{['Blood Test', 'MRI', 'CT Scan', 'ECG', 'X-Ray', 'Lab Report'].map((item) => <option key={item}>{item}</option>)}</select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-input bg-card px-4 text-sm shadow-soft"><option>All</option>{['Ready', 'Reviewed', 'Critical', 'Pending'].map((item) => <option key={item}>{item}</option>)}</select>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((report) => (
            <Card key={report.id} className="cursor-pointer transition-transform hover:-translate-y-1" onClick={() => setSelected(report.id)}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{report.type}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{report.patientName}</p>
                  </div>
                  <Badge tone={report.status === 'Critical' ? 'danger' : report.status === 'Reviewed' ? 'success' : report.status === 'Ready' ? 'info' : 'warning'}>{report.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="rounded-[16px] bg-muted/25 p-4 text-sm text-muted-foreground">{report.summary}</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Doctor</div><div className="mt-1 font-medium text-foreground">{report.doctor}</div></div>
                  <div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</div><div className="mt-1 font-medium text-foreground">{shortDate(report.date)}</div></div>
                </div>
                <Button tone="outline" className="w-full"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="sticky top-28 h-fit">
          <CardHeader><CardTitle>Preview Modal</CardTitle></CardHeader>
          <CardContent className="space-y-4 p-5">
            {active ? (
              <>
                <div className="rounded-[20px] border border-border bg-gradient-to-br from-primary/10 to-background p-5">
                  <div className="text-xl font-semibold text-foreground">{active.type} - {active.patientName}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{active.summary}</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Doctor</div><div className="mt-1 font-medium text-foreground">{active.doctor}</div></div>
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</div><div className="mt-1 font-medium text-foreground">{active.status}</div></div>
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</div><div className="mt-1 font-medium text-foreground">{shortDate(active.date)}</div></div>
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Department</div><div className="mt-1 font-medium text-foreground">{active.department}</div></div>
                </div>
                <div className="rounded-[16px] border border-dashed border-primary/25 bg-primary/5 p-4 text-sm text-muted-foreground">
                  Attachments: {active.attachments.join(' · ')}
                </div>
              </>
            ) : (
              <div className="rounded-[16px] border border-border bg-background p-8 text-sm text-muted-foreground">Select a report to view details.</div>
            )}
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.96, y: 14 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 14 }} className="w-full max-w-2xl rounded-[24px] border border-border bg-card p-6 shadow-lift" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-foreground">Preview: {active?.type}</div>
                  <div className="text-sm text-muted-foreground">Modern mock report viewer with professional spacing.</div>
                </div>
                <Button tone="ghost" onClick={() => setSelected(null)}>Close</Button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.9fr]">
                <div className="rounded-[20px] bg-muted/20 p-4">
                  <div className="aspect-[4/3] rounded-[18px] bg-[linear-gradient(135deg,rgba(37,99,235,0.16),rgba(248,250,252,1))]" />
                </div>
                <div className="space-y-3">
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Doctor</div><div className="mt-1 font-medium text-foreground">{active?.doctor}</div></div>
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</div><div className="mt-1 font-medium text-foreground">{active ? shortDate(active.date) : '-'}</div></div>
                  <div className="rounded-[16px] border border-border bg-background p-4"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</div><div className="mt-1 font-medium text-foreground">{active?.status}</div></div>
                  <Button className="w-full"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}