# Simple Job Application Tracker — Backend

REST API for Simple Job Application Tracker. It provides user registration/login, JWT authentication, profile retrieval, and user-specific job application CRUD operations.

## Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- `bcrypt` for password hashing
- `express-async-handler`
- CORS

## Features

- Register a user with a hashed password.
- Authenticate users and issue JWT access tokens.
- Return the authenticated user's profile without exposing the password field.
- Create, list, retrieve, update, and delete job applications.
- Associate each job with its owner and restrict job access to that owner.
- Centralized error response middleware.

## Project Structure

```text
Backend/
├── config/
│   └── dbConfig.js
├── controllers/
│   ├── jobController.js
│   └── userController.js
├── middleware/
│   ├── errorHandler.js
│   └── TokenValidator.js
├── models/
│   ├── jobModel.js
│   └── userModel.js
├── routes/
│   ├── JobRoutes.js
│   └── userRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Prerequisites

- Node.js and npm.
- MongoDB running locally or a MongoDB Atlas database.

## Installation

From the `Backend` directory:

```bash
npm install
```

## Environment Variables

Create a file named `.env` inside `Backend/`:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/JobTracker
SECRET_KEY=replace_with_a_long_random_secret
```

- `PORT`: Port used by the Express server.
- `MONGO_URI`: MongoDB connection string.
- `SECRET_KEY`: Private key used to sign and verify JWTs.

For MongoDB Atlas, use your Atlas connection string as `MONGO_URI`. Never commit `.env` or publish credentials. `.env.example` is a template only.

## Run the Server

Development mode with Nodemon:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

With `PORT=5001`, the API base URL is `http://localhost:5001`.

## API Endpoints

### User routes

| Method | Endpoint | Request body | Description |
|---|---|---|---|
| POST | `/api/users/register` | `{ "username": "...", "email": "...", "password": "..." }` | Create a user |
| POST | `/api/users/login` | `{ "email": "...", "password": "..." }` | Authenticate and return a JWT |
| GET | `/api/users/current` | — | Return current user's profile; requires JWT |

### Job routes

All job routes require a valid JWT in the `Authorization` header.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | List jobs owned by the logged-in user |
| POST | `/api/jobs` | Create a job application |
| GET | `/api/jobs/:id` | Retrieve one owned job application |
| PUT | `/api/jobs/:id` | Update an owned job application |
| DELETE | `/api/jobs/:id` | Delete an owned job application |

Example create-job request:

```json
{
  "company": "Example Technologies",
  "role": "Frontend Developer",
  "location": "Hyderabad",
  "package": "5 LPA",
  "skills": ["React", "JavaScript", "CSS"],
  "status": "Applied"
}
```

Allowed job statuses:

- `Applied`
- `Interview`
- `Offer`
- `Rejected`

Required fields: `company` and `role`.

### Authentication header

```http
Authorization: Bearer <JWT>
```

## Available Scripts

```bash
npm run dev    # Run with Nodemon
npm start      # Run with Node
```

## Security Notes

- Passwords are hashed with bcrypt before being saved.
- JWT signing uses `SECRET_KEY`; keep it private and use a strong random value.
- Job controller operations scope reads and writes to the authenticated user's ID.
- Do not commit `.env`, database credentials, JWT secrets, or `node_modules`.
- The supplied archive included a populated `.env` file. Replace its JWT secret before use; if it has been pushed to any remote, rotate it.

## Implementation Notes

- The server currently enables CORS for `http://localhost:5173`.
- The backend reads the MongoDB URI and JWT secret from environment variables.
- The supplied source code was inspected for this README. A full live API/database test was not performed.
