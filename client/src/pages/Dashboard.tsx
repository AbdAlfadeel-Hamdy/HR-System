import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "../components";
import customFetch from "../utils/customFetch";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isFetching, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/current-user");
      return data;
    },
    retry: false,
  });

  if (isFetching) return <div>Loading...</div>;
  if (error) navigate("/", { replace: true });

  return (
    <section className="grid grid-cols-[20rem_1fr] h-screen grid-rows-[94%_6%]">
      <Sidebar user={data.user} />
      <Outlet />
    </section>
  );
};

export default Dashboard;
