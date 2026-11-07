# RoleRider

RoleRider provides IT students with the resources that employers expect through hands-on projects.

## Features

- Recommended projects with descriptive steps and resources along each section that will help them learn the skills needed to do each section of the project
- AI Analysis analyzes the projects in the resume to determine the level of skill the student has and to take it into account when creating projects to build that skill along with learning more skills for the job role
- Certification recommendation after the projects to get certified in the respective aspect of technology
- Uses JSON Web Token to make sure that only the person who owns a resume can access it and helps the backend verify the identity of the person making a request

## Technology Stack

- **Framework:** React 18 with TypeScript (Strict mode enabled)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS with custom design tokens and semantic dark/light modes
- **Routing:** React Router v6
- **State Management:** Zustand with automatic `localStorage` synchronization
- **Icons:** Lucide React
- **Visualizations:** Recharts (Radar competency benchmarks, horizontal bar distributions)
- **Service Layer:** Asynchronous promise-based API abstractions ready for FastAPI backend connection

## Getting Started

### 1. Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or the port assigned by Vite).

### 2. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```

### 4. Backend Server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Deploying on Vercel

The repository is configured as one Vercel project with two services:

- `app` builds the Vite frontend from the repository root.
- `backend` runs the FastAPI application from `backend/`.

Requests under `/api/` are routed to `backend`; all other requests are routed to
the frontend. The frontend uses relative `/api/...` URLs, so the same paths work
through Vite's local proxy and the Vercel rewrite. Configure the backend's
runtime secrets (`DATABASE_URL`, `JWT_SECRET_KEY`, `JWT_ALGORITHM`,
`JWT_EXPIRE_MINUTES`, and `OPENAI_API_KEY`) in the Vercel project settings.

## License

MIT License. Built for students, aspiring engineers, and career changers everywhere.
