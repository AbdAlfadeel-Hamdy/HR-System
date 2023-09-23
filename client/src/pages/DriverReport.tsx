import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import { downloadDriverPDF, driverColumns } from "../utils/pdfCreators/driver";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback, DownloadButton, DriverForm } from "../components";
import dayjs from "dayjs";

const DriverReport = () => {
  const [groupBy, setGroupBy] = useState("workIn");
  const { isLoading, data, error, mutateAsync } = useMutation({
    mutationFn: async (values: { groupBy: string }) => {
      const { data } = await customFetch.post("/employees/driver", values);
      return data;
    },
  });

  let content;

  if (isLoading)
    content = (
      <SectionFeedback>
        <CircularProgress />
      </SectionFeedback>
    );
  else if (error)
    content = (
      <Alert severity="error" className="mx-8 mt-4">
        {(error as any).response.data.message}
      </Alert>
    );
  else if (data?.employees.length > 0) {
    const modifiedData = data.employees
      .flatMap((company: any) => company.documents)
      .map((row: any) => {
        return {
          ...row,
          licenseExpirationDate: row.licenseExpirationDate
            ? dayjs(row.licenseExpirationDate).format("DD/MM/YYYY")
            : "",
        };
      });
    content = (
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: (
            <NavLink to={`/dashboard/employees/${row._id}`}>{row.name}</NavLink>
          ),
        }))}
        columns={driverColumns}
      />
    );
  } else if (data?.employees.length === 0)
    content = (
      <Alert severity="info" className="mx-8 mt-4">
        No drivers were found.
      </Alert>
    );

  return (
    <>
      <div className="flex flex-col">
        <div className="h-24">
          <DriverForm queryFn={mutateAsync} groupByHandler={setGroupBy} />
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (
        <DownloadButton
          onClick={() =>
            downloadDriverPDF(
              "Driver Report",
              driverColumns,
              data.employees,
              groupBy
            )
          }
        />
      )}
    </>
  );
};

export default DriverReport;
