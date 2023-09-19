import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import customFetch from "../utils/customFetch";
import {
  downloadPassportPDF,
  passportColumns,
} from "../utils/pdfCreators/passport";
import ReactVirtualizedTable from "../components/Table";
import { DownloadButton, SectionFeedback } from "../components";

const ExpiredIdReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["passport"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/passport");
      return data;
    },
    staleTime: 1000 * 60 * 3,
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
        passportExpirationDate: new Date(
          row.passportExpirationDate
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
        columns={passportColumns}
      />
      <DownloadButton
        onClick={() =>
          downloadPassportPDF(
            "Passport Report",
            passportColumns,
            data.employees
          )
        }
      />
    </>
  );
};

export default ExpiredIdReport;
