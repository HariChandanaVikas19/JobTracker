# Simple Job Application Tracker

A full-stack web application that helps users organize and monitor their job applications in one place.

## Features

- Create an account and log in securely.
- View the authenticated user's profile.
- Add job applications with company, role, location, package, skills, and status.
- View the current user's job applications.
- Update an application's status.
- Delete an application.
- Keep each user's job records private through authenticated, user-scoped API operations.

## Tech Stack

**Frontend**
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS 4

**Backend**
- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- CORS

## Project Structure

```text
SimpleJobApplicationTracker/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Axios/
│   │   ├── Routers/
│   │   ├── components/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                 # Create locally; do not commit
│   ├── package.json
│   └── README.md
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env                 # Create locally; do not commit
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm (use a current Node.js LTS release).
- MongoDB running locally, or a MongoDB Atlas connection string.
- Git (for version control).

## Run the Application Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SimpleJobApplicationTracker
```

### 2. Configure and start the backend

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/JobTracker
SECRET_KEY=replace_with_a_long_random_secret
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string. Keep this file private.

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5001` when using the example port above.

### 3. Configure and start the frontend

Open a second terminal:

```bash
cd SimpleJobApplicationTracker/frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001
```

Start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

> The frontend Axios instance uses `VITE_API_URL` as its base URL. The backend CORS configuration currently allows `http://localhost:5173`.

## API Overview

All routes are mounted on the backend at `/api`.

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| POST | `/api/users/register` | Register a user | No |
| POST | `/api/users/login` | Log in and receive a JWT | No |
| GET | `/api/users/current` | Get the logged-in user's profile | Bearer token |
| GET | `/api/jobs` | List the logged-in user's jobs | Bearer token |
| POST | `/api/jobs` | Create a job application | Bearer token |
| GET | `/api/jobs/:id` | Get one owned job application | Bearer token |
| PUT | `/api/jobs/:id` | Update an owned job application | Bearer token |
| DELETE | `/api/jobs/:id` | Delete an owned job application | Bearer token |

### Job application fields

- `company` (required)
- `role` (required)
- `location`
- `package`
- `skills` (array)
- `status`: `Applied`, `Interview`, `Offer`, or `Rejected`

## Available Scripts

**Frontend** (`cd frontend`):
- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build in `dist`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint.

**Backend** (`cd Backend`):
- `npm run dev` — start the API with Nodemon.
- `npm start` — start the API with Node.js.

## Important GitHub Security Notes

Before pushing this project:

1. Do not upload `.env` files, MongoDB credentials, JWT secrets, or other private values.
2. The supplied archive contains a `Backend/.env` file with a JWT secret. Replace that secret before using the project publicly. If it has ever been pushed to a remote repository, rotate it immediately.
3. The supplied archive also contains a `.git` directory. Do not publish or reuse that repository history until you have checked that no secrets were committed in earlier commits. For a clean public repository, create a fresh repository after removing the old `.git` directory.
4. Do not upload `node_modules`; Git should track `package.json` and `package-lock.json` instead.
5. Add and verify a root `.gitignore` before the first commit.

Suggested root `.gitignore`:

```gitignore
node_modules/
**/node_modules/
**/.env
**/.env.*
!**/.env.example
dist/
.DS_Store
```

## Notes

This README documents the implementation found in the supplied source archive. The project was reviewed by inspecting its source files and configuration; a full end-to-end runtime test was not performed as part of this documentation task.
