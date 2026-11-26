import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Landing from "../components/Landing";
import Jobs from "../components/Jobs";
import Profile from "../components/Profile";
import AddJobForm from "../components/AddJobForm";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { RequireAuth, PublicOnly } from "./Guards";

export const jobApplicationRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "/jobs", element: <Jobs /> },
          { path: "/profile", element: <Profile /> },
          { path: "/add-job-form", element: <AddJobForm /> },
        ],
      },
      {
        element: <PublicOnly />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
