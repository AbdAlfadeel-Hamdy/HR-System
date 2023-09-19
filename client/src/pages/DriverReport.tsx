import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import { downloadDriverPDF, driverColumns } from "../utils/pdfCreators/driver";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback } from "../components";

const DriverReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/driver");
      return data;
    },
    staleTime: 1000 * 60 * 5,
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

  const modifiedData = data.employees.map((row: any) => {
    return {
      ...row,
      licenseExpirationDate: new Date(
        row.licenseExpirationDate
      ).toLocaleDateString("en-uk"),
    };
  });

  if (modifiedData.length === 0)
    return (
      <SectionFeedback>
        <Alert severity="info">No employees found.</Alert>
      </SectionFeedback>
    );

  return (
    <>
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: <NavLink to={row._id}>{row.name}</NavLink>,
        }))}
        columns={driverColumns}
      />
      <button
        onClick={() =>
          downloadDriverPDF("Driver Report", driverColumns, modifiedData)
        }
      >
        Download
      </button>
    </>
  );
};

export default DriverReport;
