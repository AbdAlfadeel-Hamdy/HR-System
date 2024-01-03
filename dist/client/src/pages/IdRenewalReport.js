import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback, IdRenewalForm, DownloadButton } from "../components";
import { downloadRenewalIdPDF, idRenewalColumns, } from "../utils/pdfCreators/IdRenewal";
import { useState } from "react";
const IdRenewalReport = () => {
    const [groupBy, setGroupBy] = useState("workIn");
    const [renewalDate, setRenewalDate] = useState("");
    const { isLoading, error, data, mutateAsync } = useMutation({
        mutationFn: async (values) => {
            const { data } = await customFetch.post("/employees/id-renewal", values);
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
                idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString("en-uk"),
                passportExpirationDate: new Date(row.passportExpirationDate).toLocaleDateString("en-uk"),
                agreementExpirationDate: new Date(row.agreementExpirationDate).toLocaleDateString("en-uk"),
            };
        });
        content = (<ReactVirtualizedTable rows={modifiedData.map((row) => ({
                ...row,
                name: (<NavLink to={`/dashboard/employees/${row._id}`}>{row.name}</NavLink>),
            }))} columns={idRenewalColumns}/>);
    }
    else if (data?.employees.length === 0)
        content = (<Alert severity="info" className="mx-8 mt-4">
        No Ids will be expired at this date.
      </Alert>);
    return (<>
      <div className="flex flex-col">
        <div className="h-24">
          <IdRenewalForm queryFn={mutateAsync} groupByHandler={setGroupBy} renewalDateHandler={setRenewalDate}/>
        </div>
        {content}
      </div>
      {data?.employees.length > 0 && (<DownloadButton onClick={() => downloadRenewalIdPDF("ID Renewal Report", data.employees, groupBy, renewalDate)}/>)}
    </>);
};
export default IdRenewalReport;
