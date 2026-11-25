import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Profile from "../components/Profile";
import NavbarLayout from "../components/NavbarLayout";
import AddJobForm from "../components/AddJobForm";
import Signup from "../components/Signup";
import Login from "../components/Login";

export const jobApplicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      { 
        index: true,
        element: <Home /> 
      },
      { 
        path: "profile",
        element: <Profile />
       },
      { 
        path: "add-job-form", 
        element: <AddJobForm /> 
      },
      {
         path: "signup",
         element: <Signup />
      },
      { 
        path: "login",
        element: <Login />
       },
    ],
  },
]);
