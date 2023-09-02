import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages";
import DashboardPage from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
