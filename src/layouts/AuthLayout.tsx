import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HospitalIllustration } from '@/components/auth';
import { PageTransition } from '@/components/common';

export function AuthLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(248,250,252,1))] text-foreground dark:bg-[linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,1))]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative hidden overflow-hidden p-8 lg:flex lg:flex-col lg:justify-between"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%)]" />
          <div className="relative z-10 max-w-xl space-y-6 pt-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-primary uppercase">
              CareScope Analytics
            </Link>
            <div className="space-y-4">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground dark:text-white">
                Premium healthcare intelligence for modern hospitals.
              </h1>
              <p className="max-w-lg text-base leading-7 text-muted-foreground dark:text-slate-300">
                Unified patient workflows, live monitoring, predictive analytics, and elegant operational clarity in one dashboard.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['100', 'Patients'],
                ['20', 'Doctors'],
                ['500', 'Appointments'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[16px] border border-border bg-white/70 p-4 shadow-soft backdrop-blur dark:bg-slate-950/30">
                  <div className="text-2xl font-semibold text-foreground">{value}+</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 mt-6 rounded-[24px] border border-border bg-white/70 p-5 shadow-lift backdrop-blur dark:bg-slate-950/35">
            <HospitalIllustration />
          </div>
        </motion.aside>
        <main className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}