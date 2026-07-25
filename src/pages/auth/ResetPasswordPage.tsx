import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Badge } from '@/components/ui';

type ResetFormValues = { password: string; confirmPassword: string };

function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetFormValues>();
  const password = watch('password') ?? '';
  const score = passwordScore(password);
  const strength = useMemo(() => {
    if (score <= 1) return { label: 'Weak', width: 'w-1/5', tone: 'danger' };
    if (score === 2 || score === 3) return { label: 'Good', width: 'w-3/5', tone: 'warning' };
    return { label: 'Strong', width: 'w-full', tone: 'success' };
  }, [score]);

  const onSubmit = handleSubmit(async () => navigate('/login'));

  return (
    <section className="w-full max-w-lg rounded-[28px] border border-border bg-white/75 p-6 shadow-lift backdrop-blur-xl dark:bg-slate-950/40 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Badge tone="info">Reset Access</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Set a new password</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create a secure password to restore your account access.</p>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary"><ShieldCheck className="h-5 w-5" /></div>
      </div>

      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
        <div className="relative">
          <Input label="New password" type={showPassword ? 'text' : 'password'} error={errors.password?.message} {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })} />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-[38px] rounded-lg p-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Password strength</span>
            <span className={strength.tone === 'danger' ? 'text-danger' : strength.tone === 'warning' ? 'text-warning-foreground' : 'text-success'}>{strength.label}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary ${strength.width}`} /></div>
        </div>
        <Input label="Confirm password" type={showPassword ? 'text' : 'password'} error={errors.confirmPassword?.message} {...register('confirmPassword', { required: 'Confirm your password', validate: (value) => value === password || 'Passwords do not match' })} />
        <Button type="submit" className="w-full" size="lg">Reset password</Button>
      </form>
    </section>
  );
}