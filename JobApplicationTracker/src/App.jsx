import { RouterProvider } from "react-router-dom";
import { jobApplicationRouter } from "./Routers/Router";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={jobApplicationRouter} />
    </AuthProvider>
  );
};

export default App;
