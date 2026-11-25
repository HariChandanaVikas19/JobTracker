import { RouterProvider } from "react-router-dom"
import { jobApplicationRouter } from "./Routers/Router"

const App = () => {
  return (
    <RouterProvider router={jobApplicationRouter}/>
  )
}

export default App