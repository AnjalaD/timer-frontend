import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { TimerPage } from "./pages/timer-page";
import { ActiveProvider } from "./components/timer/active-provider";
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

  return (
    <ActiveProvider>
      <RouterProvider router={router} />
    </ActiveProvider>
  );
}

export default App;
