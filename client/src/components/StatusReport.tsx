import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactVirtualizedTable from "../components/Table";
import { CircularProgress, Alert } from "@mui/material";
import { SectionFeedback } from ".";
import customFetch from "../utils/customFetch";
import { downloadStatusPDF, statusColumns } from "../utils/pdfCreators/status";

interface StatusReportProps {
  status: string;
}

const StatusReport: React.FC<StatusReportProps> = ({ status }) => {
  const { isFetching, data, error } = useQuery({
    queryKey: [status],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/status", {
        params: {
          status,
        },
      });
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

  if (modifiedData.length === 0)
    return (
      <SectionFeedback>
        <Alert severity="info">No employees were found with this status.</Alert>
      </SectionFeedback>
    );

  return (
    <>
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: <NavLink to={row._id}>{row.name}</NavLink>,
        }))}
        columns={statusColumns}
      />
      <button
        onClick={() =>
          downloadStatusPDF(`${status} Report`, statusColumns, data.employees)
        }
      >
        Download
      </button>
    </>
  );
};

export default StatusReport;
