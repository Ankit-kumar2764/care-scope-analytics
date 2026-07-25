import { healthcareData } from '@/mock/healthcare-data';

const wait = (delay = 180) => new Promise((resolve) => window.setTimeout(resolve, delay));

export const mockApi = {
  getDashboard: async () => {
    await wait();
    return healthcareData.analytics;
  },
  getPatients: async () => {
    await wait();
    return healthcareData.patients;
  },
  getDoctors: async () => {
    await wait();
    return healthcareData.doctors;
  },
  getAppointments: async () => {
    await wait();
    return healthcareData.appointments;
  },
  getReports: async () => {
    await wait();
    return healthcareData.diagnosticReports;
  },
  getTimeline: async () => {
    await wait();
    return healthcareData.timeline;
  },
  getMonitoring: async () => {
    await wait();
    return healthcareData.monitoring;
  },
  getForecast: async () => {
    await wait();
    return healthcareData.forecast;
  },
  getReportItems: async () => {
    await wait();
    return healthcareData.reportItems;
  },
};