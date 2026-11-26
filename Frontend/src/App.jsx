import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { jobApplicationRouter } from "./Routers/Router";
import { store } from "./app/store";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={jobApplicationRouter} />
    </Provider>
  );
};

export default App;
