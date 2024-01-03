import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress, Alert } from "@mui/material";
import customFetch from "../utils/customFetch";
import { downloadPassportPDF, passportColumns, } from "../utils/pdfCreators/passport";
import ReactVirtualizedTable from "../components/Table";
import { DownloadButton, SectionFeedback, PassportForm } from "../components";
const PassportReport = () => {
    const [groupBy, setGroupBy] = useState("nationality");
    const { isLoading, data, error, mutateAsync } = useMutation({
        mutationFn: async (values) => {
            const { data } = await customFetch.post("/employees/passport", values);
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
                passportExpirationDate: new Date(row.passportExpirationDate).toLocaleDateString("en-uk"),
            };
        });
        content = (<ReactVirtualizedTable rows={modifiedData.map((row) => ({
                ...row,
                name: (<NavLink to={`/dashboard/employees/${row._id}`}>{row.name}</NavLink>),
            }))} columns={passportColumns}/>);
    }
    else if (data?.employees.length === 0)
        content = (<Alert severity="info" className="mx-8 mt-4">
        No employees found.
      </Alert>);
    return (<>
      <div className="flex flex-col">
        <div className="h-24">
          <PassportForm queryFn={mutateAsync} groupByHandler={setGroupBy}/>
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (<DownloadButton onClick={() => downloadPassportPDF("Passport Report", data.employees, groupBy)}/>)}
    </>);
};
export default PassportReport;
