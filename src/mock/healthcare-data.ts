import { addDays, format, subDays } from 'date-fns';
import type { Appointment, DashboardAnalytics, Department, DiagnosticReport, Doctor, ForecastPoint, MonitoringSnapshot, Patient, ReportItem, TimelineItem } from '@/types/healthcare';
import { currency } from '@/utils/format';

const firstNames = ['Ava', 'Noah', 'Mia', 'Liam', 'Sophia', 'Ethan', 'Isla', 'Lucas', 'Nora', 'Mason', 'Zoe', 'Arjun', 'Isha', 'Rohan', 'Anaya', 'Kabir'];
const lastNames = ['Sharma', 'Patel', 'Gupta', 'Williams', 'Johnson', 'Martinez', 'Khan', 'Singh', 'Brown', 'Davis', 'Taylor', 'Clark'];
const cities = ['Boston', 'Seattle', 'Austin', 'Chicago', 'Denver', 'San Diego', 'New York', 'Atlanta'];
const departments = ['Cardiology', 'Neurology', 'ICU', 'Emergency', 'Orthopedics', 'Pediatrics', 'Oncology', 'Pulmonology'];
const specialties = ['Cardiologist', 'Neurologist', 'Intensivist', 'ER Physician', 'Orthopedic Surgeon', 'Pediatrician', 'Oncologist', 'Pulmonologist'];
const conditions = ['Hypertension', 'Arrhythmia', 'Migraine', 'Fracture', 'Asthma', 'Diabetes', 'Pneumonia', 'Sepsis', 'Anemia', 'Kidney Stones'];
const medications = ['Metformin', 'Aspirin', 'Amoxicillin', 'Atorvastatin', 'Ibuprofen', 'Omeprazole', 'Lisinopril', 'Albuterol'];
const reportTypes = ['Blood Test', 'MRI', 'CT Scan', 'ECG', 'X-Ray', 'Lab Report'];
const statuses: Array<Patient['status']> = ['Stable', 'Under Observation', 'Critical', 'Discharged'];
const appointmentStatuses: Array<Appointment['status']> = ['Completed', 'Pending', 'Cancelled', 'Confirmed'];
const reportStatuses: Array<DiagnosticReport['status']> = ['Ready', 'Reviewed', 'Critical', 'Pending'];

const seeded = (index: number) => {
  const value = Math.sin(index * 999) * 10000;
  return value - Math.floor(value);
};

const pick = <T,>(items: T[], index: number) => items[index % items.length];

const personName = (index: number) => `${pick(firstNames, index)} ${pick(lastNames, index * 3 + 1)}`;

const bloodPressure = (index: number) => `${110 + (index % 18)}/${70 + (index % 12)}`;

const patients: Patient[] = Array.from({ length: 100 }, (_, index) => {
  const doctorIndex = index % 20;
  const age = 18 + (index % 62);
  return {
    id: `PAT-${String(index + 1).padStart(3, '0')}`,
    mrn: `MRN-${202500 + index}`,
    name: personName(index),
    age,
    gender: pick(['Male', 'Female', 'Other'] as const, index),
    department: pick(departments, index),
    doctorAssigned: `Dr. ${pick(firstNames, doctorIndex)} ${pick(lastNames, doctorIndex + 2)}`,
    doctorId: `DOC-${String((doctorIndex % 20) + 1).padStart(2, '0')}`,
    status: pick(statuses, index + 1),
    risk: pick(['Low', 'Moderate', 'High', 'Critical'] as const, index + 2),
    icu: index % 11 === 0,
    city: pick(cities, index),
    phone: `+1 (555) ${String(200 + index).padStart(3, '0')}-${String(4000 + index).padStart(4, '0')}`,
    lastVisit: format(subDays(new Date(), index % 30), 'yyyy-MM-dd'),
    nextVisit: format(addDays(new Date(), (index % 14) + 1), 'yyyy-MM-dd'),
    vitals: {
      bloodPressure: bloodPressure(index),
      sugar: 82 + (index % 26),
      heartRate: 68 + (index % 24),
      bmi: 20.1 + ((index % 12) * 0.7),
      oxygen: 94 + (index % 6),
    },
    medicalNotes: `Patient reports ${pick(conditions, index)} with gradual improvement under current care plan.`,
    medicalHistory: [pick(conditions, index), pick(conditions, index + 2), pick(conditions, index + 4)],
    medications: [pick(medications, index), pick(medications, index + 3)],
  };
});

const doctors: Doctor[] = Array.from({ length: 20 }, (_, index) => ({
  id: `DOC-${String(index + 1).padStart(2, '0')}`,
  name: `Dr. ${pick(firstNames, index)} ${pick(lastNames, index + 1)}`,
  specialty: pick(specialties, index),
  department: pick(departments, index),
  availability: index % 3 === 0 ? 'Available now' : index % 3 === 1 ? 'In surgery' : 'Rounds',
  shift: index % 2 === 0 ? 'Morning' : 'Evening',
  patients: 12 + (index * 3) % 26,
  rating: 4.5 + ((index % 4) * 0.1),
}));

const appointments: Appointment[] = Array.from({ length: 500 }, (_, index) => {
  const day = addDays(new Date(), index % 18 - 5);
  const timeHour = 8 + (index % 10);
  return {
    id: `APT-${String(index + 1).padStart(4, '0')}`,
    patientName: personName(index + 15),
    doctor: doctors[index % doctors.length].name,
    department: pick(departments, index + 2),
    date: format(day, 'yyyy-MM-dd'),
    time: `${String(timeHour).padStart(2, '0')}:${index % 2 === 0 ? '00' : '30'}`,
    status: pick(appointmentStatuses, index + 1),
    mode: index % 4 === 0 ? 'Telehealth' : 'In-person',
    type: pick(['Consultation', 'Follow-up', 'Procedure', 'Lab Review'], index),
  };
});

const diagnosticReports: DiagnosticReport[] = Array.from({ length: 60 }, (_, index) => ({
  id: `REP-${String(index + 1).padStart(4, '0')}`,
  patientName: personName(index + 7),
  type: pick(reportTypes, index),
  status: pick(reportStatuses, index),
  doctor: doctors[index % doctors.length].name,
  date: format(subDays(new Date(), index % 22), 'yyyy-MM-dd'),
  department: pick(departments, index + 1),
  summary: `Findings indicate ${pick(conditions, index)} with recommended monitoring and escalation if symptoms persist.`,
  attachments: ['Report PDF', 'Image Set', 'Lab Sheet'],
}));

const timeline: TimelineItem[] = [
  {
    id: 'TIM-001',
    title: 'Consultation',
    date: format(subDays(new Date(), 14), 'yyyy-MM-dd'),
    doctor: doctors[0].name,
    status: 'Reviewed',
    prescription: 'Initial assessment and pain management protocol.',
    reports: ['Initial notes'],
    attachments: ['Consultation.pdf'],
    note: 'Patient admitted with chest discomfort and elevated blood pressure.',
  },
  {
    id: 'TIM-002',
    title: 'Diagnosis',
    date: format(subDays(new Date(), 12), 'yyyy-MM-dd'),
    doctor: doctors[1].name,
    status: 'Reviewed',
    prescription: 'Cardiac monitoring + sodium control.',
    reports: ['ECG', 'Vitals review'],
    attachments: ['Diagnosis.png'],
    note: 'Diagnosis confirmed as controlled hypertension with observation needed.',
  },
  {
    id: 'TIM-003',
    title: 'Lab Tests',
    date: format(subDays(new Date(), 11), 'yyyy-MM-dd'),
    doctor: doctors[2].name,
    status: 'Ready',
    prescription: 'Continue metformin and dietary monitoring.',
    reports: ['CBC', 'Glucose panel'],
    attachments: ['Labs.pdf'],
    note: 'Biochemical markers remain within an acceptable range.',
  },
  {
    id: 'TIM-004',
    title: 'MRI',
    date: format(subDays(new Date(), 9), 'yyyy-MM-dd'),
    doctor: doctors[3].name,
    status: 'Ready',
    prescription: 'Awaiting review by neurology.',
    reports: ['MRI brain'],
    attachments: ['MRI.jpg', 'MRI-report.pdf'],
    note: 'Imaging suggests mild inflammation but no acute structural issue.',
  },
  {
    id: 'TIM-005',
    title: 'Surgery',
    date: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
    doctor: doctors[4].name,
    status: 'Reviewed',
    prescription: 'Post-operative antibiotics and mobility support.',
    reports: ['OR notes'],
    attachments: ['Surgery-consent.pdf'],
    note: 'Procedure completed successfully with no complications.',
  },
  {
    id: 'TIM-006',
    title: 'Medication',
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    doctor: doctors[5].name,
    status: 'Ready',
    prescription: 'Continue amoxicillin 500mg twice daily for 5 days.',
    reports: ['Medication chart'],
    attachments: ['Prescription.pdf'],
    note: 'Patient responding well to treatment and pain is reducing.',
  },
  {
    id: 'TIM-007',
    title: 'Follow-up',
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    doctor: doctors[6].name,
    status: 'Pending',
    prescription: 'Physical therapy evaluation and repeat imaging.',
    reports: ['Follow-up plan'],
    attachments: ['Followup.docx'],
    note: 'Scheduled to validate recovery progress and adjust care plan.',
  },
  {
    id: 'TIM-008',
    title: 'Recovery',
    date: format(addDays(new Date(), 16), 'yyyy-MM-dd'),
    doctor: doctors[7].name,
    status: 'Pending',
    prescription: 'Resume routine activity gradually.',
    reports: ['Recovery assessment'],
    attachments: ['Recovery-chart.pdf'],
    note: 'Expected to reach full recovery with continued monitoring.',
  },
];

const departmentsData: Department[] = departments.map((name, index) => ({
  id: `DEP-${index + 1}`,
  name,
  capacity: 40 + index * 5,
  occupied: 24 + index * 3,
  icuBeds: 6 + (index % 3),
  emergency: 12 + index * 2,
}));

const monitoring: MonitoringSnapshot = {
  heartRate: 86,
  bloodPressure: '128/84',
  icuOccupancy: 78,
  ventilatorUsage: 64,
  emergencyQueue: 7,
  ambulanceDistance: 4.8,
  hospitalCapacity: 82,
};

const forecast: ForecastPoint[] = Array.from({ length: 12 }, (_, index) => ({
  label: format(addDays(new Date(), index * 30), 'MMM'),
  value: 58 + (index * 6) + (index % 3) * 4,
}));

const reportItems: ReportItem[] = Array.from({ length: 30 }, (_, index) => ({
  id: `RPT-${String(index + 1).padStart(3, '0')}`,
  title: `${pick(reportTypes, index)} Summary`,
  department: pick(departments, index),
  doctor: doctors[index % doctors.length].name,
  patient: patients[index % patients.length].name,
  date: format(subDays(new Date(), index % 18), 'yyyy-MM-dd'),
  status: pick(reportStatuses, index),
}));

const medicines = medications.map((name, index) => ({
  id: `MED-${index + 1}`,
  name,
  dosage: `${250 + index * 50}mg`,
  frequency: index % 2 === 0 ? 'Twice daily' : 'Once daily',
  use: pick(conditions, index),
}));

const quickActions = [
  { label: 'Add Patient', description: 'Record new admissions and demographic details.' },
  { label: 'Schedule Appointment', description: 'Book follow-ups and specialist consults.' },
  { label: 'Review Diagnostics', description: 'Open labs, imaging, and cardiology reports.' },
  { label: 'Monitor Capacity', description: 'Inspect ICU and ward utilization in real time.' },
];

const analytics: DashboardAnalytics = {
  totalPatients: patients.length,
  appointments: appointments.length,
  doctors: doctors.length,
  revenue: 1854000,
  icuBeds: 28,
  emergencyCases: 17,
  bedOccupancy: 82,
  healthScore: 91,
  patientGrowth: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, index) => ({ month, patients: 860 + index * 74 + (index % 2) * 28 })),
  appointmentTrend: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({ day, completed: 22 + index * 4, pending: 9 + (index % 3) * 2 })),
  diseaseDistribution: [
    { name: 'Cardio', value: 28, color: '#2563EB' },
    { name: 'Neuro', value: 18, color: '#1D4ED8' },
    { name: 'Respiratory', value: 16, color: '#0EA5E9' },
    { name: 'Orthopedic', value: 14, color: '#22C55E' },
    { name: 'Oncology', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 12, color: '#94A3B8' },
  ],
  revenueTrend: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, index) => ({ month, revenue: 198000 + index * 22000 + (index % 2) * 16000 })),
  ageGroups: [
    { name: '0-18', value: 12 },
    { name: '19-35', value: 20 },
    { name: '36-50', value: 24 },
    { name: '51-65', value: 26 },
    { name: '65+', value: 18 },
  ],
  recentActivities: [
    { title: 'New ICU admission', detail: 'Patient PAT-019 moved to ICU for close monitoring.', time: '3 min ago' },
    { title: 'Lab results reviewed', detail: 'Blood panel marked stable by Dr. Patel.', time: '12 min ago' },
    { title: 'Surgery completed', detail: 'Orthopedic procedure concluded with no complications.', time: '34 min ago' },
    { title: 'Ambulance dispatched', detail: 'Emergency transport arrived from North District.', time: '1 hour ago' },
  ],
  upcomingAppointments: appointments.filter((appointment) => appointment.status === 'Confirmed').slice(0, 6),
  todaysSchedule: appointments.filter((appointment) => appointment.date === format(new Date(), 'yyyy-MM-dd')).slice(0, 5),
  quickActions,
};

export const healthcareData = {
  patients,
  doctors,
  appointments,
  diagnosticReports,
  timeline,
  departments: departmentsData,
  analytics,
  monitoring,
  forecast,
  reportItems,
  medicines,
  currency,
};