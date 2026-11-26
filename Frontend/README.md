# Simple Job Application Tracker — Frontend

The frontend for Simple Job Application Tracker. It provides the user interface for account registration, login, profile viewing, and managing job applications.

## Features

- Responsive landing page with feature and workflow sections.
- User registration and login.
- Protected routes for authenticated users.
- Profile page with username, email, join date, and logout.
- List job applications belonging to the logged-in user.
- Add job applications with company, role, location, package, skills, and status.
- Edit an application's status and delete an application.
- JWT is stored in browser `localStorage` and attached to API requests through an Axios request interceptor.

## Tech Stack

- React 19
- Vite
- React Router 7
- Axios
- Tailwind CSS 4
- Redux Toolkit

## Setup

### Prerequisites

- Node.js and npm.
- The project backend running and reachable.

### Install dependencies

From the `frontend` directory:

```bash
npm install
```

### Configure the API URL

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5001
```

Set this value to the base URL where your backend is running. Do not add `/api` at the end; the application requests already include `/api/...`.

Restart the Vite server after changing `.env`.

### Start the development server

```bash
npm run dev
```

Open the URL printed in the terminal. Vite normally uses `http://localhost:5173`.

## Scripts

```bash
npm run dev       # Start the development server
npm run build     # Build the production frontend
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Main Source Structure

```text
src/
├── Axios/
│   └── AxiosInstance.jsx       # Axios base URL and JWT interceptor
├── Routers/
│   ├── Guards.jsx              # Protected/public route guards
│   └── Router.jsx              # Application routes
├── components/
│   ├── landing/                # Landing page sections
│   ├── AddJobForm.jsx          # Create job application
│   ├── Jobs.jsx                # List, update status, and delete jobs
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Profile.jsx
│   └── ...
├── context/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx        # Authentication state
│   └── useAuth.js
├── utils/
│   └── getToken.js
├── App.jsx
└── main.jsx
```

## Backend API Integration

The frontend expects these backend endpoints:

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/users/register` |
| POST   | `/api/users/login`    |
| GET    | `/api/users/current`  |
| GET    | `/api/jobs`           |
| POST   | `/api/jobs`           |
| GET    | `/api/jobs/:id`       |
| PUT    | `/api/jobs/:id`       |
| DELETE | `/api/jobs/:id`       |

Authenticated requests include:

```http
Authorization: Bearer <JWT>
```

## Important

- Start the backend before testing features that need database access.
- The backend's current CORS configuration allows `http://localhost:5173`. If the frontend runs on a different origin, update the backend CORS configuration accordingly.
- Do not commit `.env`, secrets, or `node_modules`.
- This documentation reflects the supplied source code. A full end-to-end test was not performed.
