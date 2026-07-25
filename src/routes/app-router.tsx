import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoadingState } from '@/components/common';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const OtpVerificationPage = lazy(() => import('@/pages/auth/OtpVerificationPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const PatientsPage = lazy(() => import('@/pages/patients/PatientsPage'));
const TreatmentsPage = lazy(() => import('@/pages/treatments/TreatmentsPage'));
const DiagnosticsPage = lazy(() => import('@/pages/diagnostics/DiagnosticsPage'));
const PredictiveAnalyticsPage = lazy(() => import('@/pages/predictive/PredictiveAnalyticsPage'));
const AppointmentsPage = lazy(() => import('@/pages/appointments/AppointmentsPage'));
const MonitoringPage = lazy(() => import('@/pages/monitoring/MonitoringPage'));
const ReportsPage = lazy(() => import('@/pages/reports/ReportsPage'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));

function AppBoundary() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Outlet />
    </Suspense>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppBoundary />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp-verification" element={<OtpVerificationPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/predictive-analytics" element={<PredictiveAnalyticsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}