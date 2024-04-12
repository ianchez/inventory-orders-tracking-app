import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { InventoryProvider } from "./context/inventory";

import { ROUTES } from "./routes";

// styles
import './App.css';

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <div className="App">
      <InventoryProvider>
        <RouterProvider router={router} />
      </InventoryProvider>
    </div>
  );
}

export default App;
