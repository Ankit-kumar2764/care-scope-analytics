import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FileText, Paperclip, Sparkles } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { LoadingState } from '@/components/common';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { shortDate } from '@/utils/format';

export default function TreatmentsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['treatment-timeline'], queryFn: mockApi.getTimeline });

  if (isLoading || !data) return <LoadingState title="Loading treatment timeline" description="Preparing consultation, diagnosis, lab, and recovery stages." />;

  return (
    <div className="space-y-6">
      <div>
        <Badge tone="info">Clinical Journey</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Treatment timeline</h1>
        <p className="mt-2 text-sm text-muted-foreground">Animated care progression with prescriptions, reports, and attachment previews.</p>
      </div>

      <div className="relative space-y-6 before:absolute before:bottom-0 before:left-6 before:top-0 before:w-px before:bg-primary/20 sm:before:left-8">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: index * 0.03 }}
            className="relative pl-16 sm:pl-20"
          >
            <div className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-card sm:left-2">
              <Sparkles className="h-4 w-4" />
            </div>
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge tone={item.status === 'Pending' ? 'warning' : item.status === 'Ready' ? 'info' : 'success'}>{item.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</div><div className="mt-1 text-sm font-medium text-foreground">{shortDate(item.date)}</div></div>
                  <div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Doctor</div><div className="mt-1 text-sm font-medium text-foreground">{item.doctor}</div></div>
                  <div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Prescription</div><div className="mt-1 text-sm font-medium text-foreground">{item.prescription}</div></div>
                  <div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reports</div><div className="mt-1 text-sm font-medium text-foreground">{item.reports.join(', ')}</div></div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
                <div className="flex flex-wrap gap-2">
                  {item.reports.map((report) => <Badge key={report} tone="muted"><FileText className="mr-1 h-3 w-3" />{report}</Badge>)}
                  {item.attachments.map((attachment) => <Badge key={attachment} tone="info"><Paperclip className="mr-1 h-3 w-3" />{attachment}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}