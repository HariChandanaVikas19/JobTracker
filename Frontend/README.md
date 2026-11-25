# JobTracker Frontend

React + Vite frontend for the Job Application Tracker.

## Requirements

- Node.js 20.19+ (or a compatible newer LTS release)
- npm
- The JobTracker backend running separately

## Setup

1. Open this folder in VS Code or a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in this folder (same level as `package.json`) and add:

   ```env
   VITE_API_URL=api_url
   ```

   Change the port to match the port used by your backend. Do not add `/api` to the end because the frontend requests already include `/api`.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Other commands

```bash

npm run build
npm run lint
npm run preview
```

## Backend API expected by this frontend

- `POST /api/users/register` — create an account
- `POST /api/users/login` — login; return a JWT string or an object containing `token`, `accessToken`, or `data.token`
- `GET /api/users/current` — return the logged-in user (directly or inside `user` / `data`)
- `GET /api/jobs` — return an array of jobs or an object containing `jobs`
- `POST /api/jobs` — create a job
- `PUT /api/jobs/:id` — update a job (the status update sends `{ "status": "Applied" }`)
- `DELETE /api/jobs/:id` — delete a job

Protected endpoints should accept the JWT in the `Authorization: Bearer <token>` header. The Axios instance adds this header automatically whenever a token exists in local storage.

If your backend uses different endpoint paths, status values, or response shapes, update the corresponding frontend request to match the backend contract.
