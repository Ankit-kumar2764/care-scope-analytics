import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, LayoutDashboard, Menu, MoonStar, Search, Settings, Shield, Stethoscope, BellRing, User, LogOut, FileText, CalendarDays, Brain, BarChart3, Activity, Hospital, ClipboardList } from 'lucide-react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getMockUser, signOutMock } from '@/services/mockAuth';
import { cn } from '@/utils/cn';
import { initials } from '@/utils/format';
import { Button, Input, Badge } from '@/components/ui';
import { PageTransition } from '@/components/common';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Patients', path: '/patients', icon: Stethoscope },
  { label: 'Treatment Timeline', path: '/treatments', icon: ClipboardList },
  { label: 'Diagnostics', path: '/diagnostics', icon: FileText },
  { label: 'Predictive Analytics', path: '/predictive-analytics', icon: Brain },
  { label: 'Appointments', path: '/appointments', icon: CalendarDays },
  { label: 'Monitoring', path: '/monitoring', icon: Activity },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/patients': 'Patient Management',
  '/treatments': 'Treatment Timeline',
  '/diagnostics': 'Diagnostic Reports',
  '/predictive-analytics': 'Predictive Analytics',
  '/appointments': 'Appointment Scheduling',
  '/monitoring': 'Live Monitoring',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

function useOutsideClose(onClose: () => void) {
  useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown-root]')) onClose();
    };
    document.addEventListener('mousedown', handlePointer);
    return () => document.removeEventListener('mousedown', handlePointer);
  }, [onClose]);
}

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className={cn('flex items-center gap-3 rounded-[16px] border border-border bg-card px-4 py-3 shadow-soft', collapsed && 'justify-center px-2')}>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
          <Hospital className="h-5 w-5" />
        </div>
        {!collapsed ? (
          <div>
            <div className="text-sm font-semibold text-foreground">CareScope</div>
            <div className="text-xs text-muted-foreground">Hospital Analytics</div>
          </div>
        ) : null}
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:hover:bg-white/5',
                collapsed && 'justify-center px-3',
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
      </nav>

      {!collapsed ? (
        <div className="mt-auto rounded-[20px] border border-border bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,0.72))] p-4 shadow-soft dark:bg-[linear-gradient(180deg,rgba(37,99,235,0.15),rgba(15,23,42,0.75))]">
          <div className="text-sm font-semibold text-foreground">Bed Occupancy</div>
          <p className="mt-1 text-xs text-muted-foreground">82% of beds are currently in use.</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const notifications = [
    { title: 'Critical lab result', detail: 'Patient PAT-031 flagged for elevated glucose.', tone: 'danger' as const },
    { title: 'Surgery slot confirmed', detail: 'OR-2 reserved for 2:30 PM today.', tone: 'info' as const },
    { title: 'Discharge completed', detail: 'Room 408 vacated and sanitized.', tone: 'success' as const },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            aria-label="Close notifications"
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed right-0 top-0 z-50 flex h-full w-[92vw] max-w-md flex-col border-l border-border bg-card shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Live hospital updates</p>
              </div>
              <Button tone="ghost" size="icon" onClick={onClose} aria-label="Close panel">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 p-5">
              {notifications.map((item) => (
                <div key={item.title} className="rounded-[16px] border border-border bg-background p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-foreground">{item.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{item.detail}</div>
                    </div>
                    <Badge tone={item.tone}>{item.tone}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const user = getMockUser() ?? { name: 'Dr. Olivia Carter', email: 'olivia@carescope.com', role: 'Chief Medical Officer', initials: 'OC' };
  const navigate = useNavigate();
  useOutsideClose(() => setOpen(false));

  const handleSignOut = () => {
    signOutMock();
    navigate('/login');
  };

  return (
    <div className="relative" data-dropdown-root>
      <Button tone="outline" className="gap-3 pr-3" onClick={() => setOpen((value) => !value)}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{user.initials}</span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium leading-none text-foreground">{user.name}</span>
          <span className="block text-[11px] leading-4 text-muted-foreground">{user.role}</span>
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-[18px] border border-border bg-card p-2 shadow-lift"
          >
            <div className="border-b border-border px-3 py-3">
              <div className="font-medium text-foreground">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            {[
              { label: 'Profile', icon: User },
              { label: 'Security', icon: Shield },
            ].map((item) => (
              <button key={item.label} className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-sm text-foreground hover:bg-muted/50">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.label}
              </button>
            ))}
            <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-sm text-danger hover:bg-danger/5">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useLocalStorage('carescope-sidebar-collapsed', false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const breadcrumb = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return [{ label: 'Dashboard', path: '/dashboard' }];

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return { label: routeLabels[path] ?? segment.replace(/-/g, ' '), path };
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            'sticky top-0 hidden h-screen border-r border-border bg-card/95 backdrop-blur xl:flex',
            collapsed ? 'w-[92px]' : 'w-[290px]',
          )}
        >
          <SidebarContent collapsed={collapsed} />
        </aside>

        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.button
                aria-label="Close drawer"
                className="fixed inset-0 z-40 bg-slate-950/40 xl:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="fixed left-0 top-0 z-50 h-full w-[86vw] max-w-sm border-r border-border bg-card shadow-lift xl:hidden"
              >
                <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
              <Button tone="ghost" size="icon" className="xl:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation drawer">
                <Menu className="h-4 w-4" />
              </Button>
              <Button tone="outline" size="icon" className="hidden xl:inline-flex" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle sidebar collapse">
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>

              <div className="hidden flex-1 items-center gap-3 lg:flex">
                <div className="relative w-full max-w-xl">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patients, doctors, reports, appointments..." className="pl-11" />
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <Button tone="outline" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
                  <MoonStar className="h-4 w-4" />
                </Button>
                <Button tone="outline" size="icon" onClick={() => setNotificationsOpen(true)} aria-label="Open notifications">
                  <BellRing className="h-4 w-4" />
                </Button>
                <ProfileDropdown />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LayoutDashboard className="h-4 w-4" />
                <Link to="/dashboard" className="hover:text-foreground">CareScope</Link>
                {breadcrumb.map((item, index) => (
                  <span key={item.path} className="flex items-center gap-2">
                    <span>/</span>
                    <span className={index === breadcrumb.length - 1 ? 'font-medium text-foreground' : 'hover:text-foreground'}>{item.label}</span>
                  </span>
                ))}
              </div>
              <div className="ml-auto hidden items-center gap-2 md:flex">
                <Badge tone={theme === 'dark' ? 'info' : 'success'}>{theme} mode</Badge>
                <Badge tone="muted">Premium spacing</Badge>
              </div>
            </div>
          </header>

          <main className="relative flex-1 overflow-x-hidden">
            <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
              <PageTransition>
                <Outlet />
              </PageTransition>
            </div>
          </main>
        </div>
      </div>
      <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
}