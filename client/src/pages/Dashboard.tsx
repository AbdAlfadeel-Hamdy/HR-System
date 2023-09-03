import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const Dashboard: React.FC = () => {
  return (
    <section className="grid grid-cols-[20rem_1fr] h-screen grid-rows-[94%_6%]">
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default Dashboard;
