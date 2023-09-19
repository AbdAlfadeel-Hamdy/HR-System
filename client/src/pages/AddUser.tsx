import { useNavigate } from "react-router-dom";
import { AddUserForm } from "../components";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect } from "react";

const AddUser = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user.role !== "admin") navigate("/dashboard", { replace: true });
  }, [user.role, navigate]);

  return <AddUserForm />;
};

export default AddUser;
