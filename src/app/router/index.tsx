import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import LandingPage from '../../features/landing/LandingPage';
import WebDetailsPage from '@/features/webdetails/WebDetailsPage';
import ResultsPage from '@/features/results/ResultsPage';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/detailpage',
    element: <WebDetailsPage />,
  },
  {
    path: '/resultpage',
    element: <ResultsPage />,
  },
  // {
  //   path: '/onboarding',
  //   element: <OnboardingPage />,
  // },

  // // Authenticated App Shell routes
  // {
  //   element: <AppShell />,
  //   children: [
  //     {
  //       path: '/dashboard',
  //       element: <DashboardPage />,
  //     },
  //     {
  //       path: '/careers',
  //       element: <CareerExplorerPage />,
  //     },
  //     {
  //       path: '/careers/:careerId',
  //       element: <CareerDetailPage />,
  //     },
  //     {
  //       path: '/resume',
  //       element: <ResumeAnalysisPage />,
  //     },
  //     {
  //       path: '/skills',
  //       element: <SkillAnalysisPage />,
  //     },
  //     {
  //       path: '/projects',
  //       element: <ProjectLabPage />,
  //     },
  //     {
  //       path: '/projects/:projectId',
  //       element: <ProjectDetailPage />,
  //     },
  //     {
  //       path: '/roadmap',
  //       element: <RoadmapPage />,
  //     },
  //     {
  //       path: '/certifications',
  //       element: <CertificationsPage />,
  //     },
  //     {
  //       path: '/portfolio',
  //       element: <PortfolioPage />,
  //     },
  //     {
  //       path: '/settings',
  //       element: <SettingsPage />,
  //     },
  //   ],
  // },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

