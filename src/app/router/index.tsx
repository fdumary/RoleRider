import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';

// Pages
import { LandingPage } from '../../features/landing/LandingPage';
import { LoginPage } from '../../features/auth/LoginPage';
import { RegisterPage } from '../../features/auth/RegisterPage';
import { OnboardingPage } from '../../features/onboarding/OnboardingPage';
import { DashboardPage } from '../../features/dashboard/DashboardPage';
import { CareerExplorerPage } from '../../features/careers/CareerExplorerPage';
import { CareerDetailPage } from '../../features/careers/CareerDetailPage';
import { ResumeAnalysisPage } from '../../features/resume/ResumeAnalysisPage';
import { SkillAnalysisPage } from '../../features/skills/SkillAnalysisPage';
import { ProjectLabPage } from '../../features/projects/ProjectLabPage';
import { ProjectDetailPage } from '../../features/projects/ProjectDetailPage';
import { RoadmapPage } from '../../features/roadmap/RoadmapPage';
import { CertificationsPage } from '../../features/certifications/CertificationsPage';
import { PortfolioPage } from '../../features/portfolio/PortfolioPage';
import { SettingsPage } from '../../features/settings/SettingsPage';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },

  // Authenticated App Shell routes
  {
    element: <AppShell />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/careers',
        element: <CareerExplorerPage />,
      },
      {
        path: '/careers/:careerId',
        element: <CareerDetailPage />,
      },
      {
        path: '/resume',
        element: <ResumeAnalysisPage />,
      },
      {
        path: '/skills',
        element: <SkillAnalysisPage />,
      },
      {
        path: '/projects',
        element: <ProjectLabPage />,
      },
      {
        path: '/projects/:projectId',
        element: <ProjectDetailPage />,
      },
      {
        path: '/roadmap',
        element: <RoadmapPage />,
      },
      {
        path: '/certifications',
        element: <CertificationsPage />,
      },
      {
        path: '/portfolio',
        element: <PortfolioPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

