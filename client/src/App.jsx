import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ROUTES } from "./constants/router";

// styles
import './App.css';

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
