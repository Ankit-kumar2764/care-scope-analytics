import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Badge } from '@/components/ui';

type ForgotFormValues = { email: string };

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotFormValues>({
    defaultValues: { email: 'doctor@hospital.com' },
  });

  const onSubmit = handleSubmit(async () => navigate('/otp-verification'));

  return (
    <section className="w-full max-w-lg rounded-[28px] border border-border bg-white/75 p-6 shadow-lift backdrop-blur-xl dark:bg-slate-950/40 sm:p-8">
      <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>
      <div className="mt-6 space-y-4">
        <Badge tone="info">Password Recovery</Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">Forgot your password?</h2>
        <p className="text-sm text-muted-foreground">Send a verification code to the email associated with your account.</p>
      </div>
      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
        <Input label="Email address" type="email" placeholder="doctor@hospital.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Sending code...' : 'Send reset code'}
        </Button>
      </form>
    </section>
  );
}