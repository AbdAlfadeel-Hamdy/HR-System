import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import SignIn from "../components/SignIn";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { isFetching, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/current-user");
      return data;
    },
    retry: false,
  });

  if (isFetching) return <div>Loading...</div>;
  if (data?.user) navigate("/dashboard", { replace: true });
  return <SignIn />;
};

export default LoginPage;
