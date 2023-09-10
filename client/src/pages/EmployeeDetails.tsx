import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Paper } from "@mui/material";
import dayjs from "dayjs";
import customFetch from "../utils/customFetch";
import {
  EmployeeForm as EditEmployeeForm,
  EmployeeInfoTable,
  Modal,
  VacationsHistoryTable,
} from "../components";

const EmployeeDetails: React.FC = () => {
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
    idNumber: employee.idNumber,
    idExpirationDate: dayjs(employee.idExpirationDate),
    name: employee.name,
    nationality: employee.nationality,
    passportNumber: employee.passportNumber,
    passportExpirationDate: dayjs(employee.passportExpirationDate),
    sponsor: employee.sponsor,
    workIn: employee.workIn,
    agreementExpirationDate: dayjs(employee.agreementExpirationDate),
    status: employee.status,
    licenseExpirationDate: dayjs(employee.licenseExpirationDate),
    licenseType: employee.licenseType,
  };

  const vacations = [
    {
      leavingDate: new Date(),
      expectedReturn: new Date(),
      period: 120,
      actualReturn: new Date(),
      actualPeriod: 120,
    },
    {
      leavingDate: new Date(),
      expectedReturn: new Date(),
      period: 120,
      actualReturn: new Date(),
      actualPeriod: 120,
    },
    {
      leavingDate: new Date(),
      expectedReturn: new Date(),
      period: 120,
      actualReturn: new Date(),
      actualPeriod: 120,
    },
  ];

  return (
    <section className="grid grid-cols-[2fr,3fr] row-span-2 gap-2 p-1 ">
      <Paper className="py-2">
        <h2 className="text-center text-2xl font-thin mb-4">Employee Info</h2>
        <EmployeeInfoTable employee={employee} />
        <div className="flex justify-center mt-4">
          <Modal>
            <EditEmployeeForm
              url={`/employees/${employee._id}`}
              method="PATCH"
              initialValues={initialValues}
              successFn={refetch}
            />
          </Modal>
        </div>
      </Paper>
      <Paper className="py-2">
        <h2 className="text-center text-2xl font-thin mb-4">
          Vacations History
        </h2>
        <VacationsHistoryTable vacations={vacations} />
      </Paper>
    </section>
  );
};

export default EmployeeDetails;
