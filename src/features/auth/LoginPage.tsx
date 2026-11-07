import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Sparkles, ArrowRight, Lock, Mail, CheckCircle2, UserCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addToast } = useStore();
  const [email, setEmail] = useState('alex.morgan@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        type: 'success',
        title: `Welcome back, ${user.name.split(' ')[0]}!`,
        message: 'Successfully authenticated to RoleRider workspace.',
      });
      navigate('/dashboard');
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Logged in as Alex Morgan (Demo)',
        message: 'Target Role: Backend Software Engineer',
      });
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Role<span className="text-indigo-600 dark:text-indigo-400">Rider</span>
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Or{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            create a new candidate profile
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#131D31] py-8 px-6 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 sm:px-10">
          {/* Quick Demo Login Pill */}
          <div className="mb-6 p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-500" /> Demo Account Ready
              </span>
              <span className="text-[10px] font-mono uppercase bg-indigo-200/60 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.5 rounded">
                One-Click
              </span>
            </div>
            <p className="text-indigo-700/80 dark:text-indigo-300/80 text-[11px] leading-relaxed mb-2.5">
              Sign in instantly as <strong>Alex Morgan</strong> (CS Student, Target: Backend Software Engineer) with pre-loaded project evidence.
            </p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full"
              isLoading={isLoading}
              onClick={handleQuickDemoLogin}
            >
              Sign In with Demo Candidate
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#131D31] px-2 text-slate-400">Or use email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
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
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo environment: password reset not required.'); }} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="md"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Protected by RoleRider Candidate Data Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

