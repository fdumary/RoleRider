import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Sparkles, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        name: name || 'Alex Morgan',
        email: email || 'alex.morgan@university.edu',
      });
      addToast({
        type: 'success',
        title: 'Account Created',
        message: 'Welcome to RoleRider! Let us tailor your career pathway.',
      });
      navigate('/onboarding');
    }, 600);
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
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create your candidate profile
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#131D31] py-8 px-6 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address (University or Personal)"
              type="email"
              placeholder="alex@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Create Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              By creating an account, you agree to RoleRider's Candidate Terms and consent to simulated resume skill analysis.
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Onboarding
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
            <Link to="/login" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline block">
              Prefer guest access? Continue as Guest on Sign In &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

