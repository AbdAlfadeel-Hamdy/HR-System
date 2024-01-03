import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { DownloadButton, SectionFeedback, SponsorForm } from "../components";
import { downloadSponsorPDF, sponsorColumns, } from "../utils/pdfCreators/sponsor";
import { useState } from "react";
const SponsorReport = () => {
    const [groupBy, setGroupBy] = useState("");
    const [sponsor, setSponsor] = useState("");
    const { isLoading, error, data, mutateAsync } = useMutation({
        mutationFn: async (values) => {
            const { data } = await customFetch.post("/employees/sponsor", values);
            return data;
        },
    });
    let content;
    if (isLoading)
        content = (<SectionFeedback>
        <CircularProgress />
      </SectionFeedback>);
    else if (error)
        content = (<Alert severity="error" className="mx-8 mt-4">
        {error.response.data.message}
      </Alert>);
    else if (data?.employees.length > 0) {
        const modifiedData = data.employees
            .flatMap((company) => company.documents)
            .map((row) => {
            return {
                ...row,
                status: row.status === "duty"
                    ? "🟢 Duty"
                    : row.status === "vacation"
                        ? "🟡 Vacation"
                        : "🔴 Cancelled",
                idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString("en-uk"),
            };
        });
        content = (<ReactVirtualizedTable rows={modifiedData.map((row) => ({
                ...row,
                name: (<NavLink to={`/dashboard/employees/${row._id}`}>{row.name}</NavLink>),
            }))} columns={sponsorColumns}/>);
    }
    else if (data?.employees.length === 0)
        content = (<Alert severity="info" className="mx-8 mt-4">
        No employees were found for this sponsor.
      </Alert>);
    return (<>
      <div className="flex flex-col">
        <div className="h-24">
          <SponsorForm queryFn={mutateAsync} groupByHandler={setGroupBy} sponsorHandler={setSponsor}/>
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (<DownloadButton onClick={() => downloadSponsorPDF("Employees Report", data.employees, groupBy, sponsor)}/>)}
    </>);
};
export default SponsorReport;
