import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import customFetch from "../utils/customFetch";
import { LoginForm } from "../components";
const LoginPage = () => {
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError } = useQuery({
        queryFn: async () => {
            const { data } = await customFetch.get("/auth/current-user");
            return data;
        },
        retry: false,
        refetchOnMount: true,
    });
    if (isFetching)
        return (<section className="grid place-content-center h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </section>);
    else if (isSuccess)
        navigate("/dashboard", { replace: true });
    else if (isError)
        return <LoginForm />;
};
export default LoginPage;
