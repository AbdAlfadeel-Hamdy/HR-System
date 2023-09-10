import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import customFetch from "../utils/customFetch";
import { EmployeeInfoTable, VacationsHistoryTable } from "../components";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams();
  const {
    isFetching,
    isError,
    data: employee,
  } = useQuery({
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
      </Paper>
      <Paper className="py-2">
        <h2 className="text-center text-2xl font-thin mb-4">
          Vacations History
        </h2>
        <VacationsHistoryTable vacations={vacations} />
      </Paper>
      <div>Images</div>
    </section>
  );
};

export default EmployeeDetails;
