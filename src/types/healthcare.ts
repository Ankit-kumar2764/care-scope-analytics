export type ThemeMode = 'light' | 'dark';

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export type PatientStatus = 'Stable' | 'Under Observation' | 'Critical' | 'Discharged';

export type AppointmentStatus = 'Completed' | 'Pending' | 'Cancelled' | 'Confirmed';

export type ReportStatus = 'Ready' | 'Reviewed' | 'Critical' | 'Pending';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  availability: string;
  shift: string;
  patients: number;
  rating: number;
}

export interface Vitals {
  bloodPressure: string;
  sugar: number;
  heartRate: number;
  bmi: number;
  oxygen: number;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: Gender;
  department: string;
  doctorAssigned: string;
  doctorId: string;
  status: PatientStatus;
  risk: 'Low' | 'Moderate' | 'High' | 'Critical';
  icu: boolean;
  city: string;
  phone: string;
  lastVisit: string;
  nextVisit: string;
  vitals: Vitals;
  medicalNotes: string;
  medicalHistory: string[];
  medications: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  mode: 'In-person' | 'Telehealth';
  type: string;
}

export interface DiagnosticReport {
  id: string;
  patientName: string;
  type: string;
  status: ReportStatus;
  doctor: string;
  date: string;
  department: string;
  summary: string;
  attachments: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  doctor: string;
  status: ReportStatus;
  prescription: string;
  reports: string[];
  attachments: string[];
  note: string;
}

export interface Department {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  icuBeds: number;
  emergency: number;
}

export interface DashboardAnalytics {
  totalPatients: number;
  appointments: number;
  doctors: number;
  revenue: number;
  icuBeds: number;
  emergencyCases: number;
  bedOccupancy: number;
  healthScore: number;
  patientGrowth: Array<{ month: string; patients: number }>;
  appointmentTrend: Array<{ day: string; completed: number; pending: number }>;
  diseaseDistribution: Array<{ name: string; value: number; color: string }>;
  revenueTrend: Array<{ month: string; revenue: number }>;
  ageGroups: Array<{ name: string; value: number }>;
  recentActivities: Array<{ title: string; detail: string; time: string }>;
  upcomingAppointments: Appointment[];
  todaysSchedule: Appointment[];
  quickActions: Array<{ label: string; description: string }>; 
}

export interface MonitoringSnapshot {
  heartRate: number;
  bloodPressure: string;
  icuOccupancy: number;
  ventilatorUsage: number;
  emergencyQueue: number;
  ambulanceDistance: number;
  hospitalCapacity: number;
}

export interface ForecastPoint {
  label: string;
  value: number;
}

export interface ReportItem {
  id: string;
  title: string;
  department: string;
  doctor: string;
  patient: string;
  date: string;
  status: ReportStatus;
}