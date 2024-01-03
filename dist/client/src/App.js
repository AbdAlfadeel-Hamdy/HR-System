import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard, LoginPage, ActivityLogReport, DriverReport, ExpiredIdReport, PassportReport, OnDutyReport, OnVacationReport, Employees, AddEmployee, AddUser, EmployeeDetails, IdRenewalReport, SponsorReport, CancelledReport, ErrorPage, Users, } from "./pages";
const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    { index: true, element: <Employees /> },
                    {
                        path: "employees/:id",
                        element: <EmployeeDetails />,
                    },
                    {
                        path: "users",
                        element: <Users />,
                    },
                    {
                        path: "reports",
                        children: [
                            { path: "activity-log", element: <ActivityLogReport /> },
                            { path: "driver", element: <DriverReport /> },
                            { path: "id", element: <IdRenewalReport /> },
                            { path: "expired-id", element: <ExpiredIdReport /> },
                            { path: "passport", element: <PassportReport /> },
                            { path: "on-duty", element: <OnDutyReport /> },
                            { path: "on-vacation", element: <OnVacationReport /> },
                            { path: "sponsor", element: <SponsorReport /> },
                            { path: "cancelled", element: <CancelledReport /> },
                        ],
                    },
                    {
                        path: "actions",
                        children: [
                            { path: "add-employee", element: <AddEmployee /> },
                            { path: "add-user", element: <AddUser /> },
                        ],
                    },
                ],
            },
        ],
    },
]);
const App = () => {
    return (<QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>);
};
export default App;
