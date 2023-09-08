import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import customFetch from "../utils/customFetch";
import SignIn from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const { isFetching, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/current-user");
      return data;
    },
    retry: false,
    refetchOnMount: false,
  });

  if (isFetching)
    return (
      <section className="grid place-content-center h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </section>
    );
  if (data?.user) navigate("/dashboard", { replace: true });
  if (!data) return <SignIn />;
};

export default LoginPage;
