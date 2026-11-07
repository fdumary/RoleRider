import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Settings,
  User,
  Layers,
  Clock,
  Sun,
  Moon,
  RotateCcw,
  CheckCircle2,
  Bell,
  FileText,
  AlertTriangle,
  Save,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { DifficultyLevel, ExperienceLevel } from '../../types';

export const SettingsPage: React.FC = () => {
  const {
    user,
    setUser,
    careers,
    theme,
    setTheme,
    resumeData,
    resetDemoData,
    addToast
  } = useStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [headline, setHeadline] = useState(user.headline);
  const [targetCareerId, setTargetCareerId] = useState(user.targetCareerId);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(user.experienceLevel);
  const [weeklyHours, setWeeklyHours] = useState(user.weeklyHours);
  const [preferredDifficulty, setPreferredDifficulty] = useState<DifficultyLevel>(user.preferredDifficulty);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [milestoneReminders, setMilestoneReminders] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name,
      email,
      headline,
      targetCareerId,
      experienceLevel,
      weeklyHours,
      preferredDifficulty,
    });
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your profile and learning preferences have been updated.',
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all prototype state back to default demo fixtures?')) {
      resetDemoData();
      setName('Alex Morgan');
      setEmail('alex.morgan@university.edu');
      setHeadline('Junior Computer Science Major aspiring to Backend Engineering');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Account & Learning Preferences
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your candidate profile, target career calibrations, and local prototype storage settings.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset Demo Data
        </Button>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              <span>Candidate Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Input
              label="Professional Headline / Bio"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Current Background / Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white text-xs sm:text-sm px-3.5 py-2"
              >
                <option value="just_starting">Just Starting Out</option>
                <option value="student">College / University Student</option>
                <option value="recent_graduate">Recent Graduate</option>
                <option value="career_changer">Career Changer</option>
                <option value="early_career">Early-Career Professional (1-2 yrs)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Target Career Calibration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              <span>Target Role Benchmark Calibration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Target Technology Career
              </label>
              <select
                value={targetCareerId}
                onChange={(e) => setTargetCareerId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white text-xs sm:text-sm px-3.5 py-2"
              >
                {careers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Weekly Available Study Hours
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={4}
                    max={30}
                    step={2}
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0 w-16">
                    {weeklyHours} hrs/wk
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Project Difficulty
                </label>
                <select
                  value={preferredDifficulty}
                  onChange={(e) => setPreferredDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white text-xs sm:text-sm px-3.5 py-2 capitalize"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme & Display Tokens */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Theme & Visual Styling</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex-1 p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  theme === 'dark'
                    ? 'border-indigo-600 bg-[#0E1626] text-white ring-2 ring-indigo-500/30'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark Mode (Recommended)</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex-1 p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  theme === 'light'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/30'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save All Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};

