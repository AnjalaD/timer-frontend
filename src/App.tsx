import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { TimerPage } from "./pages/timer-page";
import { RemotePage } from "./pages/remote-page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/timer",
      element: <TimerPage />,
    },
    {
      path: "/remote/:roomId",
      element: <RemotePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
