import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CircularProgress, Box, Paper, Button } from "@mui/material";
import { EditNote, AddOutlined, Delete, Download } from "@mui/icons-material";
import customFetch from "../utils/customFetch";
import {
  VacationForm,
  EmployeeForm,
  EmployeeInfoTable,
  Modal,
  VacationsHistoryTable,
} from "../components";
import { toast } from "react-toastify";
import {
  downloadVacationsHistoryPDF,
  vacationsHistoryColumns,
} from "../utils/pdfCreators/vacationsHistory";

const EmployeeDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isFetching,
    isError,
    data: employee,
    refetch,
  } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const { data } = await customFetch(`/employees/${id}`);
      return data.employee;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutateAsync: deleteEmployeeHandler, isLoading } = useMutation({
    mutationKey: ["employees", "cancelled"],
    mutationFn: async () =>
      await customFetch.delete(`/employees/${employee._id}`),
    onSuccess: () => {
      toast.success("Deleted employee successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error((err as any).response.data.message),
  });

  if (isFetching)
    return (
      <section className="grid place-content-center h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </section>
    );
  if (isError) return <div>err</div>;

  const initialValues = {
    ...employee,
    idExpirationDate: dayjs(employee.idExpirationDate),
    passportExpirationDate: dayjs(employee.passportExpirationDate),
    agreementExpirationDate: dayjs(employee.agreementExpirationDate),
    licenseExpirationDate: dayjs(employee.licenseExpirationDate),
  };

  return (
    <section className="grid grid-cols-[2fr,3fr] row-span-2 gap-2 p-1 ">
      <Paper className="py-2">
        <h2 className="text-center text-2xl font-thin mb-4">Employee Info</h2>
        <EmployeeInfoTable employee={employee} />
        <div className="flex justify-center gap-4 mt-4">
          <Modal btnIcon={<EditNote />} btnText="Edit">
            <EmployeeForm
              url={`/employees/${employee._id}`}
              method="PATCH"
              initialValues={initialValues}
              successFn={refetch}
            />
          </Modal>
          <Modal
            btnIcon={<Delete />}
            btnText="Delete"
            btnColor="error"
            feedback
            feedbackTitle="Are you sure that you want to delete this employee?"
            feedbackFn={deleteEmployeeHandler}
            feedbackFnLoading={isLoading}
          />
        </div>
      </Paper>
      <Paper className="py-2 ">
        <h2 className="text-center text-2xl font-thin mb-4">
          Vacations History
        </h2>
        <VacationsHistoryTable
          vacations={employee.vacations}
          successFn={refetch}
        />
        <div className="flex justify-center gap-4 mt-4">
          <Modal btnIcon={<AddOutlined />} btnText="Add">
            <VacationForm
              url={`/vacations`}
              method="POST"
              initialValues={{
                idNumber: employee.idNumber,
                employeeName: employee.name,
                leavingDate: dayjs(),
                expectedReturnDate: dayjs(),
              }}
              successFn={refetch}
              successMsg="Added vacation successfully"
              formTitle="Add Vacation"
            />
          </Modal>
          {employee.vacations.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() =>
                downloadVacationsHistoryPDF(
                  "Vacations History Report",
                  vacationsHistoryColumns,
                  employee.vacations,
                  employee.name,
                  employee.idNumber
                )
              }
            >
              Download
            </Button>
          )}
        </div>
      </Paper>
    </section>
  );
};

export default EmployeeDetails;
