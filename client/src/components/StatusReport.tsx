import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ReactVirtualizedTable from "../components/Table";
import { CircularProgress, Alert } from "@mui/material";
import { DownloadButton, SectionFeedback, StatusForm } from ".";
import customFetch from "../utils/customFetch";
import { downloadStatusPDF, statusColumns } from "../utils/pdfCreators/status";

interface StatusReportProps {
  status: string;
}

const StatusReport: React.FC<StatusReportProps> = ({ status }) => {
  const [groupBy, setGroupBy] = useState("workIn");

  const { isLoading, data, error, mutateAsync } = useMutation({
    mutationFn: async (values: { groupBy: string }) => {
      const { data } = await customFetch.get("/employees/status", {
        params: {
          status,
          groupBy: values.groupBy,
        },
      });
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
          idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
            "en-uk"
          ),
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
        columns={statusColumns}
      />
    );
  } else if (data?.employees.length === 0)
    content = (
      <Alert severity="info" className="mx-8 mt-4">
        No employees were found with this status.
      </Alert>
    );

  return (
    <>
      <div className="flex flex-col">
        <div className="h-24">
          <StatusForm queryFn={mutateAsync} groupByHandler={setGroupBy} />
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (
        <DownloadButton
          onClick={() =>
            downloadStatusPDF(
              `${status[0].toUpperCase()}${status.slice(1)} Report`,
              statusColumns,
              data.employees,
              groupBy
            )
          }
        />
      )}
    </>
  );
};

export default StatusReport;
