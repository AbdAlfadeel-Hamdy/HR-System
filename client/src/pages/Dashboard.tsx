import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  if (!isLoggedIn) navigate("/", { replace: true });
  return (
    <section className="flex">
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default Dashboard;
