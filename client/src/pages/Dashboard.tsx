import { Outlet, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { Sidebar } from "../components";
import useCurrentUser from "../hooks/useCurrentUser";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isFetching, user, error } = useCurrentUser();

  let content;

  if (isFetching)
    content = (
      <section className="grid place-content-center h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </section>
    );
  else if (error) navigate("/", { replace: true });
  else
    content = (
      <section className="grid grid-cols-[20rem_1fr] max-h-screen grid-rows-[94%_6%]">
        <Sidebar user={user} />
        <Outlet />
      </section>
    );

  return content;
};

export default Dashboard;
