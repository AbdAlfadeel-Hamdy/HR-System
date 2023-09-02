import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Cancelled,
  LoginPage,
  ActivityLogReport,
  DriverReport,
  IdReport,
  ExpiredIdReport,
  PassportReport,
  VacationsReport,
  StatusReport,
} from "./pages";

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
        element: <Dashboard />,
        children: [
          {
            path: "cancelled",
            element: <Cancelled />,
          },
          {
            path: "reports",
            children: [
              { path: "activity-log", element: <ActivityLogReport /> },
              { path: "driver", element: <DriverReport /> },
              { path: "id", element: <IdReport /> },
              { path: "expired-id", element: <ExpiredIdReport /> },
              { path: "passport", element: <PassportReport /> },
              { path: "vacations", element: <VacationsReport /> },
              { path: "status", element: <StatusReport /> },
            ],
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
