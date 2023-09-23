import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Alert, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import customFetch from "../utils/customFetch";
import useCurrentUser from "../hooks/useCurrentUser";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback, Modal, UserForm } from "../components";

const cancelledColumns = [
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "Email",
    dataKey: "email",
  },
  {
    width: 200,
    dataKey: "actions",
  },
];

const Users = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user.role !== "admin") navigate("/dashboard", { replace: true });
  }, [user.role, navigate]);

  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/users");
      return data;
    },
  });

  const { mutateAsync: deleteUserHandler, isLoading } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (userId: string) => {
      await customFetch.delete(`/auth/users/${userId}`);
    },
    onSuccess: () => {
      toast.success("Deleted user successfully");
      refetch();
    },
    onError: (err) => {
      toast.error((err as any).response.data.message);
    },
  });

  if (isFetching)
    return (
      <SectionFeedback>
        <CircularProgress />
      </SectionFeedback>
    );
  if (error)
    return (
      <SectionFeedback>
        <Alert severity="error">{(error as any).response.data.message}</Alert>
      </SectionFeedback>
    );

  const modifiedData = data?.users?.map((row: any) => {
    return {
      ...row,
      actions: (
        <div className="flex gap-1 items-center">
          <Modal
            btnIcon={<Edit className="flex justify-center" />}
            btnColor="inherit"
            btnVariant="text"
          >
            <UserForm
              url={`/auth/users/${row._id}`}
              method="PATCH"
              initialValues={{
                name: row.name,
                email: row.email,
              }}
              successFn={refetch}
              successMsg="Updated user Successfully"
              formTitle="Update user"
            />
          </Modal>
          <Modal
            btnIcon={<Delete />}
            btnColor="error"
            btnVariant="text"
            feedback
            feedbackTitle="Are you sure that you want to delete this user?"
            feedbackFn={() => deleteUserHandler(row._id)}
            feedbackFnLoading={isLoading}
          />
        </div>
      ),
    };
  });

  if (modifiedData.length === 0)
    return (
      <SectionFeedback>
        <Alert severity="info">No Users were found</Alert>
      </SectionFeedback>
    );

  return (
    <div className="row-span-2">
      <ReactVirtualizedTable rows={modifiedData} columns={cancelledColumns} />
    </div>
  );
};

export default Users;
