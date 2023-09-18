import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback, SponsorForm } from "../components";
import {
  downloadSponsorPDF,
  sponsorColumns,
} from "../utils/pdfCreators/sponsor";
import { useState } from "react";

const SponsorReport = () => {
  const [groupBy, setGroupBy] = useState("workIn");
  const { isLoading, error, data, mutateAsync } = useMutation({
    mutationFn: async (values: any) => {
      const { data } = await customFetch.post("/employees/sponsor", values);
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
          status:
            row.status === "duty"
              ? "\uD83D\uDFE2 Duty"
              : "\uD83D\uDFE1 Vacation",
          idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
            "en-uk"
          ),
        };
      });
    content = (
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: <NavLink to={row._id}>{row.name}</NavLink>,
        }))}
        columns={sponsorColumns}
      />
    );
  } else if (data?.employees.length === 0)
    content = (
      <Alert severity="info" className="mx-8 mt-4">
        No employees found for this sponsor.
      </Alert>
    );

  return (
    <>
      <div className="flex flex-col">
        <div className="h-24">
          <SponsorForm queryFn={mutateAsync} groupByHandler={setGroupBy} />
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (
        <button
          onClick={() =>
            downloadSponsorPDF(
              "Sponsor Report",
              sponsorColumns,
              data.employees,
              groupBy
            )
          }
        >
          Download
        </button>
      )}
    </>
  );
};

export default SponsorReport;
