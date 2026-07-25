import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from '@/components/ui';

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const updateOtp = (index: number, value: string) => {
    const next = [...otp];
    next[index] = value.slice(0, 1);
    setOtp(next);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <section className="w-full max-w-lg rounded-[28px] border border-border bg-white/75 p-6 shadow-lift backdrop-blur-xl dark:bg-slate-950/40 sm:p-8">
      <Badge tone="success">One-Time Passcode</Badge>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Verify your identity</h2>
      <p className="mt-2 text-sm text-muted-foreground">Enter the 6-digit code sent to your email or device.</p>

      <div className="mt-6 grid grid-cols-6 gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            value={digit}
            onChange={(event) => updateOtp(index, event.target.value.replace(/\D/g, ''))}
            className="h-14 rounded-2xl border border-border bg-card text-center text-lg font-semibold text-foreground shadow-soft focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            inputMode="numeric"
            maxLength={1}
          />
        ))}
      </div>

      <Button className="mt-6 w-full" size="lg" onClick={() => navigate('/reset-password')}>
        Verify code
      </Button>
    </section>
  );
}