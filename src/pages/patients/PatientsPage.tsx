import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { LoadingState, EmptyState } from '@/components/common';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableWrapper } from '@/components/ui';
import { shortDate } from '@/utils/format';

export default function PatientsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['patients'], queryFn: mockApi.getPatients });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [risk, setRisk] = useState('All');
  const [page, setPage] = useState(1);





const [selectedId, setSelectedId] = useState<string | null>(null);

const filtered = useMemo(() => {
  if (!data) return [];

  return data.filter((patient) => {
    const matchesSearch = [
      patient.name,
      patient.department,
      patient.doctorAssigned,
      patient.mrn,
    ].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    );

    const matchesStatus =
      status === "All" || patient.status === status;

    const matchesRisk =
      risk === "All" || patient.risk === risk;

    return matchesSearch && matchesStatus && matchesRisk;
  });
}, [data, search, status, risk]);

if (isLoading || !data) {
  return (
    <LoadingState
      title="Loading patients"
      description="Fetching the mock patient registry and care profiles."
    />
  );
}



  const perPage = 10;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const selectedPatient = data.find((patient) => patient.id === selectedId) ?? pageItems[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Patient Management</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Search, filter, and review patient records with modern hospital operations views.</p>
              </div>
              <Badge tone="success">{filtered.length} records</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient, doctor, department, MRN..." className="pl-11" />
              </div>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground shadow-soft">
                {['All', 'Stable', 'Under Observation', 'Critical', 'Discharged'].map((value) => <option key={value}>{value}</option>)}
              </select>
              <select value={risk} onChange={(event) => setRisk(event.target.value)} className="h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground shadow-soft">
                {['All', 'Low', 'Moderate', 'High', 'Critical'].map((value) => <option key={value}>{value}</option>)}
              </select>
            </div>

            <TableWrapper>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Next Visit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.map((patient) => (
                    <TableRow key={patient.id} className="cursor-pointer" onClick={() => setSelectedId(patient.id)}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{patient.name}</div>
                          <div className="text-xs text-muted-foreground">{patient.mrn} · {patient.age}y · {patient.gender}</div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.department}</TableCell>
                      <TableCell>{patient.doctorAssigned}</TableCell>
                      <TableCell><Badge tone={patient.status === 'Critical' ? 'danger' : patient.status === 'Under Observation' ? 'warning' : patient.status === 'Discharged' ? 'muted' : 'success'}>{patient.status}</Badge></TableCell>
                      <TableCell><Badge tone={patient.risk === 'Critical' ? 'danger' : patient.risk === 'High' ? 'warning' : patient.risk === 'Moderate' ? 'info' : 'success'}>{patient.risk}</Badge></TableCell>
                      <TableCell>{shortDate(patient.nextVisit)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>

            {filtered.length === 0 ? <EmptyState title="No patients found" description="Adjust filters or search with a different keyword." /> : null}

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Page {page} of {pages}</p>
              <div className="flex items-center gap-2">
                <Button tone="outline" size="sm" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1}><ChevronLeft className="h-4 w-4" /> Prev</Button>
                <Button tone="outline" size="sm" onClick={() => setPage((value) => Math.min(pages, value + 1))} disabled={page === pages}>Next <ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedPatient ? (
        <Card className="h-fit sticky top-28">
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            <div className="rounded-[20px] border border-border bg-gradient-to-br from-primary/10 to-background p-5">
              <div className="text-lg font-semibold text-foreground">{selectedPatient.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{selectedPatient.department} · {selectedPatient.doctorAssigned}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={selectedPatient.status === 'Critical' ? 'danger' : selectedPatient.status === 'Under Observation' ? 'warning' : 'success'}>{selectedPatient.status}</Badge>
                <Badge tone={selectedPatient.icu ? 'danger' : 'muted'}>{selectedPatient.icu ? 'ICU' : 'Ward'}</Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Blood Pressure', selectedPatient.vitals.bloodPressure],
                ['Sugar', `${selectedPatient.vitals.sugar} mg/dL`],
                ['Heart Rate', `${selectedPatient.vitals.heartRate} bpm`],
                ['BMI', selectedPatient.vitals.bmi.toFixed(1)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[16px] border border-border bg-background p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
                  <div className="mt-2 text-lg font-semibold text-foreground">{value}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground">Medical Notes</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedPatient.medicalNotes}</p>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground">Medical History</div>
              <div className="mt-3 space-y-2">
                {selectedPatient.medicalHistory.map((item) => <div key={item} className="rounded-xl bg-muted/30 px-4 py-3 text-sm text-foreground">{item}</div>)}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}