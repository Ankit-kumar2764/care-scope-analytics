import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Github, Mail, Apple } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button, Badge } from '@/components/ui';
import { signInMock } from '@/services/mockAuth';
import { initials } from '@/utils/format';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    defaultValues: { email: 'olivia@carescope.com', password: 'CareScope@123', rememberMe: true },
  });

  const onSubmit = handleSubmit(async (values) => {
    signInMock({ name: 'Dr. Olivia Carter', email: values.email, role: 'Chief Medical Officer', initials: initials('Dr. Olivia Carter') });
    navigate('/dashboard');
  });

  return (
    <motion.section className="w-full max-w-lg rounded-[28px] border border-border bg-white/75 p-6 shadow-lift backdrop-blur-xl dark:bg-slate-950/40 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <Badge tone="info">Secure Sign In</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">Access your CareScope analytics workspace.</p>
        </div>
        <div className="hidden rounded-2xl bg-primary/10 p-3 text-primary sm:block">
          <Mail className="h-5 w-5" />
        </div>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="doctor@hospital.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>Password</span>
            <Link to="/forgot-password" className="text-primary hover:text-secondary">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" {...register('rememberMe')} />
          Remember me on this device
        </label>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">or continue with</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button tone="outline" className="w-full justify-center gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </Button>
        <Button tone="outline" className="w-full justify-center gap-2">
          <Mail className="h-4 w-4" />
          Google
        </Button>
        <Button tone="outline" className="w-full justify-center gap-2">
          <Apple className="h-4 w-4" />
          Apple
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to CareScope?{' '}
        <Link to="/register" className="font-medium text-primary hover:text-secondary">
          Create an account
        </Link>
      </p>
    </motion.section>
  );
}