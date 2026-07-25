import { useForm } from 'react-hook-form';
import { Bell, Globe, LockKeyhole, MoonStar, Settings2, UserCircle2, Hospital } from 'lucide-react';
import { Badge, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { FormSection } from '@/components/common/form-section';
import { useTheme } from '@/hooks/useTheme';

type SettingsForm = {
  name: string;
  email: string;
  language: string;
  hospital: string;
  timezone: string;
};

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { register, handleSubmit } = useForm<SettingsForm>({
    defaultValues: {
      name: 'Dr. Olivia Carter',
      email: 'olivia@carescope.com',
      language: 'English',
      hospital: 'CareScope General Hospital',
      timezone: 'UTC-5',
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(() => undefined)}>
      <div>
        <Badge tone="info">Admin Preferences</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Frontend-only settings for profile, notifications, appearance, security, language, and hospital metadata.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FormSection title="Profile" description="Update your name, email, and organization details.">
          <Input label="Full name" {...register('name')} />
          <Input label="Email" type="email" {...register('email')} />
          <Input label="Hospital information" {...register('hospital')} />
        </FormSection>

        <FormSection title="Notifications" description="Enable notifications for key clinical events.">
          {['Critical alerts', 'Surgery updates', 'Discharge summaries', 'Appointment reminders'].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-3 text-sm">
              <span>{item}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
            </label>
          ))}
        </FormSection>

        <FormSection title="Appearance" description="Light and dark mode for premium dashboard readability.">
          <div className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-4">
            <div>
              <div className="font-medium text-foreground">Theme mode</div>
              <div className="text-sm text-muted-foreground">Current: {theme}</div>
            </div>
            <Button type="button" tone="outline" onClick={toggleTheme}><MoonStar className="mr-2 h-4 w-4" /> Toggle</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Compact cards', 'Sticky navigation', 'Motion reduction'].map((item) => (
              <label key={item} className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-3 text-sm">
                <span>{item}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              </label>
            ))}
          </div>
        </FormSection>

        <FormSection title="Security" description="Manage password, sessions, and authentication behavior.">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <Input label="New password" type="password" placeholder="Enter a secure password" />
          <Input label="Confirm new password" type="password" placeholder="Repeat password" />
        </FormSection>

        <FormSection title="Language" description="Choose application locale and timezone.">
          <Input label="Language" {...register('language')} />
          <Input label="Timezone" {...register('timezone')} />
          <label className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-3 text-sm">
            <span>24-hour time format</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          </label>
        </FormSection>

        <FormSection title="Hospital information" description="Core branding and department setup values.">
          <Input label="Hospital name" {...register('hospital')} />
          <Input label="Support email" type="email" defaultValue="support@carescope.com" />
          <Input label="Support phone" defaultValue="+1 (555) 987-6543" />
        </FormSection>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            <label className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-3 text-sm"><span>Auto-save forms</span><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" /></label>
            <label className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-3 text-sm"><span>Show clinical hints</span><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" /></label>
            <label className="flex items-center justify-between rounded-[16px] border border-border bg-background px-4 py-3 text-sm"><span>Enable keyboard shortcuts</span><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" /></label>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button tone="outline" type="button">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}