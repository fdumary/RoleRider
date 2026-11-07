import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { authService } from '../../services/api';
import { Sparkles, ArrowRight, Lock, Mail, UserCheck, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setGuestSession, addToast } = useStore();

  // Form states
  const [email, setEmail] = useState('alex.morgan@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Handle Guest Authentication (Primary Route)
  const handleContinueAsGuest = async () => {
    setIsGuestLoading(true);
    setAuthError(null);

    try {
      const response = await authService.loginAsGuest();
      setGuestSession(response.access_token, response.user.id, response.expires_in);

      addToast({
        type: 'success',
        title: 'Guest Session Activated',
        message: 'Signed JWT issued. 60-minute guest session is active.',
      });

      // Direct to streamlined onboarding
      navigate('/onboarding');
    } catch (err: any) {
      console.error('Guest authentication error:', err);
      setAuthError(err.message || 'Unable to establish guest session. Please retry.');
      addToast({
        type: 'error',
        title: 'Authentication Error',
        message: 'Could not connect to guest authentication service.',
      });
    } finally {
      setIsGuestLoading(false);
    }
  };

  const handlePasswordSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Explain clearly that password accounts are preserved for future full authentication
    addToast({
      type: 'info',
      title: 'Prototype Notice',
      message: 'Full email/password accounts are preserved for future release. Using Guest-First authentication for this session.',
    });
    handleContinueAsGuest();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" aria-label="RoleRider — Go to homepage" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Role<span className="text-indigo-600 dark:text-indigo-400">Rider</span>
          </span>
        </Link>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Don't just apply, qualify!
        </p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in or explore as Guest
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#131D31] py-8 px-6 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 sm:px-10">
          {/* Error Banner */}
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* PRIMARY: CONTINUE AS GUEST (PROMINENT & DISTINCT) */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50/40 dark:from-indigo-950/60 dark:to-[#0E1626] border border-indigo-200 dark:border-indigo-800 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Instant Guest Access</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-3.5">
              Jump directly into career exploration and resume qualification analysis with a 60-minute signed guest session.
            </p>
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full shadow-md shadow-indigo-500/25 font-bold"
              isLoading={isGuestLoading}
              disabled={isGuestLoading}
              onClick={handleContinueAsGuest}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue as Guest
            </Button>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block font-mono">
              Signed JWT • Cryptographic UUID • 60-Min Expiry
            </span>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#131D31] px-2 text-slate-400 font-medium">
                Or Sign In with Account
              </span>
            </div>
          </div>

          {/* Email / Password Form (Preserved for Future Authentication) */}
          <form className="space-y-4" onSubmit={handlePasswordSignIn}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              placeholder="alex.morgan@university.edu"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              placeholder="••••••••••••"
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password recovery will be available when full registered authentication launches.');
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="md"
              className="w-full"
              disabled={isGuestLoading}
            >
              Sign In (Full Account)
            </Button>
          </form>

          {/* Create an Account Link (Preserved) */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
