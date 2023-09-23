import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress, Alert } from "@mui/material";
import customFetch from "../utils/customFetch";
import {
  downloadPassportPDF,
  passportColumns,
} from "../utils/pdfCreators/passport";
import ReactVirtualizedTable from "../components/Table";
import { DownloadButton, SectionFeedback, PassportForm } from "../components";

const PassportReport = () => {
  const [groupBy, setGroupBy] = useState("nationality");
  const { isLoading, data, error, mutateAsync } = useMutation({
    mutationFn: async (values: { groupBy: string }) => {
      const { data } = await customFetch.post("/employees/passport", values);
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
      <Alert severity="error">{(error as any).response.data.message}</Alert>
    );
  else if (data?.employees.length > 0) {
    const modifiedData = data.employees
      .flatMap((company: any) => company.documents)
      .map((row: any) => {
        return {
          ...row,
          passportExpirationDate: new Date(
            row.passportExpirationDate
          ).toLocaleDateString("en-uk"),
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
        columns={passportColumns}
      />
    );
  } else if (data?.employees.length === 0)
    content = <Alert severity="info">No employees found.</Alert>;

  return (
    <>
      <div className="flex flex-col">
        <div className="h-24">
          <PassportForm queryFn={mutateAsync} groupByHandler={setGroupBy} />
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (
        <DownloadButton
          onClick={() =>
            downloadPassportPDF(
              "Passport Report",
              passportColumns,
              data.employees,
              groupBy
            )
          }
        />
      )}
    </>
  );
};

export default PassportReport;
