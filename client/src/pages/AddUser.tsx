import { useNavigate } from "react-router-dom";
import { UserForm } from "../components";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect } from "react";

const AddUser = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user.role !== "admin") navigate("/dashboard", { replace: true });
  }, [user.role, navigate]);

  return (
    <UserForm
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      formTitle="Add User"
      method="POST"
      url="/auth/register"
      successMsg="Created user successfully"
    />
  );
};

export default AddUser;
