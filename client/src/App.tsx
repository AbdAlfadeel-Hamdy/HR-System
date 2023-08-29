import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages";
import HomeLayout from "./pages/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
