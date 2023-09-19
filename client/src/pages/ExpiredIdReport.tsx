import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Alert } from "@mui/material";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback } from "../components";
import {
  downloadExpiredIdPDF,
  expiredIdColumns,
} from "../utils/pdfCreators/expiredId";

const ExpiredIdReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["expired-id"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/expired-id");
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
        passportExpirationDate: new Date(
          row.passportExpirationDate
        ).toLocaleDateString("en-uk"),
      };
    });

  if (modifiedData.length === 0)
    return (
      <SectionFeedback>
        <Alert severity="info">No employees found with this status.</Alert>
      </SectionFeedback>
    );

  return (
    <>
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: <NavLink to={row._id}>{row.name}</NavLink>,
          status:
            row.status === "duty"
              ? "\uD83D\uDFE2 Duty"
              : "\uD83D\uDFE1 Vacation",
        }))}
        columns={expiredIdColumns}
      />
      <button
        onClick={() =>
          downloadExpiredIdPDF(
            "Expired ID Report",
            expiredIdColumns,
            data.employees
          )
        }
      >
        Download
      </button>
    </>
  );
};

export default ExpiredIdReport;
