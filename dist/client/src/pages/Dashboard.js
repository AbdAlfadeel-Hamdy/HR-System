import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import customFetch from "../utils/customFetch";
import { Sidebar } from "../components";
const Dashboard = () => {
    const navigate = useNavigate();
    const { isFetching, data, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await customFetch.get("/auth/current-user");
            return data;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    if (isFetching)
        return (<section className="grid place-content-center h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </section>);
    else if (error)
        navigate("/", { replace: true });
    return (<section className="grid grid-cols-[20rem_1fr] max-h-screen grid-rows-[94%_6%]">
      <Sidebar user={data?.user}/>
      <Outlet />
    </section>);
};
export default Dashboard;
