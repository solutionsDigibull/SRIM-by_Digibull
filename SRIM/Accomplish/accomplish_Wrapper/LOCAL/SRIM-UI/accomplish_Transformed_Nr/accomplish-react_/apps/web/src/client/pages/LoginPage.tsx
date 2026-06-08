import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  loginWithCredentials,
  loginWithEmailPassword,
  loginWithGoogle,
  loginWithPat,
  requestMobileOtp,
  requestOnboarding,
  requestPasswordReset,
} from '@/lib/session';
import { SpinnerGap, ShieldCheck } from '@phosphor-icons/react';
import logoImage from '/assets/digibull-logo.png';

const DIGIBULL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SRIM_LETTERS = ['S', 'R', 'I', 'M'];

type LoginMode = 'uid' | 'email' | 'mobile';
type SupportPanel = 'none' | 'forgot' | 'onboarding';

const TEST_CREDS = {
  token: 'srim-dev-token',
  username: 'digibull',
  password: 'srim-test-2026',
};

const authModes: Array<{
  id: LoginMode;
  label: string;
  caption: string;
}> = [
  { id: 'uid', label: 'UID', caption: 'User ID + password' },
  { id: 'email', label: 'Email', caption: 'Mail + password' },
  { id: 'mobile', label: 'Mobile', caption: 'Number + OTP' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: DIGIBULL_EASE },
});

function Field({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-cyan-300/60 focus:bg-white/[0.1] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
      />
    </label>
  );
}

function PrimaryButton({
  loading,
  disabled,
  children,
}: {
  loading: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading || disabled}
      whileHover={{ scale: loading || disabled ? 1 : 1.015, y: loading || disabled ? 0 : -1 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.99 }}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-amber-300 px-4 py-3 text-sm font-black text-slate-950 shadow-[0_24px_70px_-28px_rgba(34,211,238,0.8)] transition disabled:cursor-not-allowed disabled:opacity-45"
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-white/35 blur-xl transition-transform duration-700 group-hover:translate-x-[120%]" />
      {loading ? <SpinnerGap className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
      <span className="relative">{loading ? 'Checking access...' : children}</span>
    </motion.button>
  );
}

function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.015, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
    </motion.button>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>('uid');
  const [supportPanel, setSupportPanel] = useState<SupportPanel>('none');
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [pat, setPat] = useState('');
  const [onboardingName, setOnboardingName] = useState('');
  const [onboardingCompany, setOnboardingCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAuth = async (action: () => Promise<unknown>, fallback: string) => {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      await action();
      void navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (mode === 'uid') {
      if (!uid.trim() || !password.trim()) {
        setError('Enter your UID and password.');
        return;
      }
      void runAuth(
        () => loginWithCredentials(uid.trim(), password),
        'UID login failed. Check your credentials.',
      );
      return;
    }
    if (mode === 'email') {
      if (!email.trim() || !password.trim()) {
        setError('Enter your email and password.');
        return;
      }
      void runAuth(
        () => loginWithEmailPassword(email.trim(), password),
        'Email login failed. Check your credentials.',
      );
      return;
    }
    if (!mobile.trim()) {
      setError('Enter your mobile number.');
      return;
    }
    if (!otp.trim()) {
      void runAuth(
        () => requestMobileOtp(mobile.trim()),
        'Could not send OTP yet.',
      );
      return;
    }
    void runAuth(
      () => requestMobileOtp(`${mobile.trim()}:${otp.trim()}`),
      'OTP login failed.',
    );
  };

  const handleNetBirdLogin = (event: FormEvent) => {
    event.preventDefault();
    if (!pat.trim()) {
      setError('Enter your NetBird access token.');
      return;
    }
    void runAuth(() => loginWithPat(pat.trim()), 'NetBird login failed. Check your token.');
  };

  const handleForgotPassword = (event: FormEvent) => {
    event.preventDefault();
    const target = email.trim() || uid.trim();
    if (!target) {
      setError('Enter your email or UID first.');
      return;
    }
    void runAuth(
      async () => {
        await requestPasswordReset(target);
      },
      'Password reset is not connected yet.',
    );
  };

  const handleOnboarding = (event: FormEvent) => {
    event.preventDefault();
    if (!onboardingName.trim() || !email.trim()) {
      setError('Enter your name and email for onboarding.');
      return;
    }
    void runAuth(
      async () => {
        await requestOnboarding({
          name: onboardingName.trim(),
          email: email.trim(),
          company: onboardingCompany.trim() || undefined,
        });
      },
      'Onboarding is not connected yet.',
    );
  };

  const handleGoogleLogin = () => {
    void runAuth(() => loginWithGoogle(), 'Google OAuth is not connected yet.');
  };

  const handleTestLogin = () => {
    void runAuth(
      () => loginWithCredentials(TEST_CREDS.username, TEST_CREDS.password),
      'Test login failed.',
    );
  };

  return (
    <>
      <style>{`
        @keyframes srim-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes srim-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes srim-scan {
          0% { transform: translateY(-120%); opacity: 0; }
          15%, 80% { opacity: 0.45; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        .srim-orbit { animation: srim-orbit 22s linear infinite; }
        .srim-float { animation: srim-float 6s ease-in-out infinite; }
        .srim-scan { animation: srim-scan 5s ease-in-out infinite; }
      `}</style>

      <main className="relative min-h-screen overflow-hidden bg-[#050704] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.28),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(250,204,21,0.18),transparent_26%),radial-gradient(circle_at_68%_78%,rgba(22,163,74,0.18),transparent_32%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:42px_42px]" />
        <motion.div
          aria-hidden
          className="srim-orbit absolute -left-32 top-16 h-[560px] w-[560px] rounded-full border border-cyan-200/10"
        />
        <motion.div
          aria-hidden
          className="srim-orbit absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full border border-amber-200/10"
          style={{ animationDirection: 'reverse' }}
        />

        <div className="relative z-10 grid min-h-screen gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(430px,520px)] lg:px-12 xl:px-20">
          <section className="flex min-h-[42vh] flex-col justify-center">
            <motion.div {...fadeUp(0.05)} className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-100/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              DigiBull Secure Access
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="mt-8 flex items-center gap-5">
              <div className="srim-float rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-[0_30px_90px_-40px_rgba(34,211,238,0.75)] backdrop-blur">
                <img src={logoImage} alt="DigiBull.ai" className="h-20 w-20 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.42em] text-white/40">
                  DigiBull.ai
                </p>
                <div className="mt-2 flex gap-1">
                  {SRIM_LETTERS.map((letter, index) => (
                    <motion.span
                      key={letter}
                      initial={{ opacity: 0, y: 32, rotateX: -35 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.7, delay: 0.28 + index * 0.07, ease: DIGIBULL_EASE }}
                      className="select-none text-6xl font-black leading-none tracking-[-0.08em] sm:text-7xl xl:text-8xl"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #67e8f9 44%, #facc15 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.35)} className="mt-10 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl xl:text-7xl">
              One login gate.
              <span className="block text-cyan-200">Five ways in.</span>
            </motion.h1>
            <motion.p {...fadeUp(0.48)} className="mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              UID, email, mobile OTP, NetBird, and Google are arranged in one clear
              DigiBull access panel. Working methods sign in now; upcoming methods
              say exactly what backend is needed.
            </motion.p>

            <motion.div {...fadeUp(0.62)} className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {['Animated', 'Onboarding', 'Forgot password'].map((label) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white/70 backdrop-blur">
                  {label}
                </div>
              ))}
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, x: 28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: DIGIBULL_EASE }}
            className="relative flex items-center"
          >
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.075] p-4 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-5">
              <div className="srim-scan pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cyan-200/20 to-transparent" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />

              <div className="rounded-[1.55rem] border border-white/10 bg-black/25 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">
                      Welcome back
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
                      Login to SRIM
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-right text-[11px] font-bold uppercase tracking-widest text-cyan-100">
                    Secure
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-1.5">
                  {authModes.map((authMode) => {
                    const selected = mode === authMode.id;
                    return (
                      <button
                        key={authMode.id}
                        type="button"
                        onClick={() => {
                          setMode(authMode.id);
                          setSupportPanel('none');
                          setError(null);
                          setNotice(null);
                        }}
                        className={`rounded-xl px-2 py-2.5 text-left transition-all ${
                          selected
                            ? 'bg-white text-slate-950 shadow-[0_16px_40px_-24px_rgba(255,255,255,0.8)]'
                            : 'text-white/55 hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        <div className="text-sm font-black">{authMode.label}</div>
                        <div className={`mt-0.5 hidden text-[10px] sm:block ${selected ? 'text-slate-600' : 'text-white/35'}`}>
                          {authMode.caption}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleCredentialSubmit} className="mt-5 space-y-4">
                  <AnimatePresence mode="wait">
                    {mode === 'uid' && (
                      <motion.div key="uid" {...fadeUp(0)} className="space-y-4">
                        <Field
                          id="uid"
                          label="User ID"
                          value={uid}
                          placeholder="digibull"
                          autoComplete="username"
                          onChange={(value) => {
                            setUid(value);
                            setError(null);
                          }}
                        />
                        <Field
                          id="uid-password"
                          label="Password"
                          type="password"
                          value={password}
                          placeholder="Enter password"
                          autoComplete="current-password"
                          onChange={(value) => {
                            setPassword(value);
                            setError(null);
                          }}
                        />
                      </motion.div>
                    )}

                    {mode === 'email' && (
                      <motion.div key="email" {...fadeUp(0)} className="space-y-4">
                        <Field
                          id="email"
                          label="Email"
                          type="email"
                          value={email}
                          placeholder="you@digibull.ai"
                          autoComplete="email"
                          onChange={(value) => {
                            setEmail(value);
                            setError(null);
                          }}
                        />
                        <Field
                          id="email-password"
                          label="Password"
                          type="password"
                          value={password}
                          placeholder="Enter password"
                          autoComplete="current-password"
                          onChange={(value) => {
                            setPassword(value);
                            setError(null);
                          }}
                        />
                      </motion.div>
                    )}

                    {mode === 'mobile' && (
                      <motion.div key="mobile" {...fadeUp(0)} className="space-y-4">
                        <Field
                          id="mobile"
                          label="Mobile number"
                          type="tel"
                          value={mobile}
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                          onChange={(value) => {
                            setMobile(value);
                            setError(null);
                          }}
                        />
                        <Field
                          id="otp"
                          label="OTP"
                          value={otp}
                          placeholder="Enter OTP after request"
                          autoComplete="one-time-code"
                          onChange={(value) => {
                            setOtp(value);
                            setError(null);
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <PrimaryButton loading={loading}>
                    {mode === 'mobile' && !otp.trim() ? 'Send OTP' : 'Continue'}
                  </PrimaryButton>
                </form>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSupportPanel(supportPanel === 'forgot' ? 'none' : 'forgot');
                      setError(null);
                    }}
                    className="font-semibold text-cyan-200/80 transition hover:text-cyan-100"
                  >
                    Forgot password?
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSupportPanel(supportPanel === 'onboarding' ? 'none' : 'onboarding');
                      setError(null);
                    }}
                    className="font-semibold text-amber-100/80 transition hover:text-amber-50"
                  >
                    New user onboarding
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {supportPanel === 'forgot' && (
                    <motion.form
                      key="forgot"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleForgotPassword}
                      className="mt-4 overflow-hidden rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.06] p-4"
                    >
                      <p className="text-sm font-bold text-cyan-50">Reset access</p>
                      <p className="mt-1 text-xs leading-5 text-cyan-50/55">
                        Uses the email field above if present, otherwise the UID field.
                      </p>
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-3 rounded-xl bg-cyan-200 px-3 py-2 text-xs font-black text-slate-950 disabled:opacity-50"
                      >
                        Send reset link
                      </button>
                    </motion.form>
                  )}

                  {supportPanel === 'onboarding' && (
                    <motion.form
                      key="onboarding"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleOnboarding}
                      className="mt-4 space-y-3 overflow-hidden rounded-2xl border border-amber-200/15 bg-amber-200/[0.06] p-4"
                    >
                      <p className="text-sm font-bold text-amber-50">Create access request</p>
                      <Field
                        id="onboarding-name"
                        label="Name"
                        value={onboardingName}
                        placeholder="Your name"
                        onChange={setOnboardingName}
                      />
                      <Field
                        id="onboarding-company"
                        label="Company"
                        value={onboardingCompany}
                        placeholder="DigiBull / client org"
                        onChange={setOnboardingCompany}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-amber-200 px-3 py-2 text-xs font-black text-slate-950 disabled:opacity-50"
                      >
                        Request onboarding
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                    OAuth
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <GhostButton onClick={handleGoogleLogin} disabled={loading}>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-black text-slate-900">
                      G
                    </span>
                    Continue with Google
                  </GhostButton>
                  <button
                    type="button"
                    onClick={() => setNotice('NetBird access is below as a compact Windows login option.')}
                    className="min-h-11 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    NetBird / Windows
                  </button>
                </div>

                <form onSubmit={handleNetBirdLogin} className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                        Windows login via NetBird
                      </p>
                      <p className="mt-1 text-[11px] text-white/35">
                        Existing PAT flow, kept small at the bottom.
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[10px] font-bold text-emerald-200">
                      Active
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="password"
                      value={pat}
                      placeholder="nbp_xxxxxxxxxxxxxxxxxxxxxxxx"
                      autoComplete="off"
                      onChange={(event) => {
                        setPat(event.target.value);
                        setError(null);
                      }}
                      className="min-h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-emerald-200/50"
                    />
                    <button
                      type="submit"
                      disabled={loading || !pat.trim()}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      NetBird
                    </button>
                  </div>
                </form>

                <AnimatePresence>
                  {(error || notice) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                        error
                          ? 'border-red-300/20 bg-red-400/10 text-red-100'
                          : 'border-cyan-200/20 bg-cyan-200/10 text-cyan-50'
                      }`}
                    >
                      {error || notice}
                    </motion.div>
                  )}
                </AnimatePresence>

                {import.meta.env.DEV && (
                  <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.045] p-3 text-xs text-white/50">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono uppercase tracking-widest text-cyan-100/80">
                        Local test access
                      </p>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleTestLogin}
                        className="rounded-full bg-cyan-200 px-3 py-1.5 font-black text-slate-950 disabled:opacity-50"
                      >
                        Sign in as Tester
                      </button>
                    </div>
                    <p className="mt-2 font-mono">
                      user: {TEST_CREDS.username} / pass: {TEST_CREDS.password}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
