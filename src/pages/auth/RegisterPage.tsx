import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Github, Mail, Apple, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Badge } from '@/components/ui';
import { signInMock } from '@/services/mockAuth';
import { initials } from '@/utils/format';

type RegisterFormValues = {
  fullName: string;
  email: string;
  hospital: string;
  password: string;
  confirmPassword: string;
};

function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: 'Dr. Olivia Carter',
      email: 'olivia@carescope.com',
      hospital: 'CareScope General Hospital',
      password: 'CareScope@123',
      confirmPassword: 'CareScope@123',
    },
  });

  const password = watch('password');
  const score = passwordScore(password || '');
  const strength = useMemo(() => {
    if (score <= 1) return { label: 'Weak', tone: 'danger', width: 'w-1/5' };
    if (score === 2 || score === 3) return { label: 'Good', tone: 'warning', width: 'w-3/5' };
    return { label: 'Strong', tone: 'success', width: 'w-full' };
  }, [score]);

  const onSubmit = handleSubmit(async (values) => {
    signInMock({ name: values.fullName, email: values.email, role: 'Clinical Lead', initials: initials(values.fullName) });
    navigate('/dashboard');
  });

  return (
    <section className="w-full max-w-xl rounded-[28px] border border-border bg-white/75 p-6 shadow-lift backdrop-blur-xl dark:bg-slate-950/40 sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Badge tone="success">Create Access</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Start using CareScope Analytics with mock authentication.</p>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
      </div>

      <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
        <div className="sm:col-span-2">
          <Input label="Full name" placeholder="Dr. Olivia Carter" error={errors.fullName?.message} {...register('fullName', { required: 'Full name is required' })} />
        </div>
        <Input label="Email" type="email" placeholder="doctor@hospital.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
        <Input label="Hospital name" placeholder="CareScope General Hospital" error={errors.hospital?.message} {...register('hospital', { required: 'Hospital name is required' })} />

        <div className="sm:col-span-2 space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })}
            />
            <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-[38px] rounded-lg p-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Password strength</span>
              <span className={strength.tone === 'danger' ? 'text-danger' : strength.tone === 'warning' ? 'text-warning-foreground' : 'text-success'}>{strength.label}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all ${strength.width}`} />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <Input label="Confirm password" type={showPassword ? 'text' : 'password'} placeholder="Repeat your password" error={errors.confirmPassword?.message} {...register('confirmPassword', { required: 'Confirm your password', validate: (value) => value === password || 'Passwords do not match' })} />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button tone="outline" className="justify-center gap-2"><Github className="h-4 w-4" /> GitHub</Button>
            <Button tone="outline" className="justify-center gap-2"><Mail className="h-4 w-4" /> Google</Button>
            <Button tone="outline" className="justify-center gap-2"><Apple className="h-4 w-4" /> Apple</Button>
          </div>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-secondary">Sign in</Link>
      </p>
    </section>
  );
}