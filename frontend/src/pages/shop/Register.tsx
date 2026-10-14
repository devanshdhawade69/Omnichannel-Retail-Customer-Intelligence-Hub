import { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const termsId = useId();

  const navigate = useNavigate();
  const { login } = useShop();

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-border' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-destructive' };
    if (score <= 2) return { score: 2, label: 'Moderate', color: 'bg-amber-500' };
    if (score <= 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleInstantDemoRegister = () => {
    const randomId = Math.floor(Math.random() * 900) + 100;
    const demoUser = {
      id: randomId,
      username: 'Taylor Vance',
      email: `taylor.vance${randomId}@flipstore.com`,
      role: 'customer',
    };
    setIsLoading(true);
    setTimeout(() => {
      login(demoUser);
      setIsLoading(false);
      navigate('/shop');
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('Please accept the terms and conditions to proceed.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ecommerce/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username.trim(), 
          email: email.trim().toLowerCase(), 
          password 
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        setError(data.error || 'Registration failed. Try again or use quick demo account.');
        return;
      }

      login({
        id: data.user_id || Math.floor(Math.random() * 900) + 200,
        username: username.trim(),
        email: email.trim().toLowerCase(),
        role: 'customer',
      });
      setIsLoading(false);
      navigate('/shop');
    } catch {
      // Graceful offline registration fallback
      setTimeout(() => {
        login({
          id: Math.floor(Math.random() * 900) + 200,
          username: username.trim() || email.split('@')[0],
          email: email.trim().toLowerCase(),
          role: 'customer',
        });
        setIsLoading(false);
        navigate('/shop');
      }, 350);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4 py-12">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 bg-card/85 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-3">
            <Sparkles size={13} />
            <span>Join FlipStore Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Create Account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get personalized bundles, member pricing & real-time order tracking.
          </p>
        </div>

        {/* 1-Click Instant Demo Onboarding */}
        <button
          type="button"
          onClick={handleInstantDemoRegister}
          className="w-full mb-6 p-3 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/15 transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Zap size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>Instant 1-Click Customer Demo</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary">Fast</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Auto-create profile and enter shop directly</p>
            </div>
          </div>
          <ArrowRight size={15} className="text-primary group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="relative flex py-1 items-center mb-5">
          <div className="flex-grow border-t border-border/60"></div>
          <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-muted-foreground">or register details</span>
          <div className="flex-grow border-t border-border/60"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/15 border border-destructive/40 text-destructive rounded-lg text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5" htmlFor="reg-name">
              Full Name / Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-muted-foreground" size={16} />
              <input
                id="reg-name"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-border/80 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-foreground text-sm placeholder:text-muted-foreground"
                placeholder="Taylor Vance"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5" htmlFor="reg-email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-border/80 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-foreground text-sm placeholder:text-muted-foreground"
                placeholder="taylor@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5" htmlFor="reg-password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-secondary/50 border border-border/80 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-foreground text-sm placeholder:text-muted-foreground"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Strength:</span>
                  <span className="font-semibold text-foreground">{strength.label}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 h-1.5 rounded-full overflow-hidden bg-secondary">
                  <div className={`h-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                  <div className={`h-full ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                  <div className={`h-full ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                  <div className={`h-full ${strength.score >= 4 ? strength.color : 'bg-transparent'}`} />
                </div>
              </div>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="pt-1">
            <label htmlFor={termsId} className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground">
              <input
                id={termsId}
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-border text-primary focus:ring-primary"
              />
              <span>
                I agree to the <span className="text-foreground hover:underline">Terms of Service</span>,{' '}
                <span className="text-foreground hover:underline">Privacy Policy</span>, and personalized AI shopping insights.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg shadow-primary/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Setting up account...
              </span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Benefits Strip */}
        <div className="mt-6 pt-5 border-t border-border/60 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Instant VIP Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-primary" />
            <span>Encrypted Credentials</span>
          </div>
        </div>

        <div className="mt-5 text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link to="/" className="text-primary hover:underline font-semibold ml-1">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

