import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Alert } from "@mui/material";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { DownloadButton, SectionFeedback } from "../components";
import { downloadExpiredIdPDF, expiredIdColumns, } from "../utils/pdfCreators/expiredId";
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
        return (<SectionFeedback>
        <CircularProgress />
      </SectionFeedback>);
    if (error)
        return (<SectionFeedback>
        <Alert severity="error">{error.response.data.message}</Alert>
      </SectionFeedback>);
    const modifiedData = data.employees
        .flatMap((company) => company.documents)
        .map((row) => {
        return {
            ...row,
            idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString("en-uk"),
            passportExpirationDate: new Date(row.passportExpirationDate).toLocaleDateString("en-uk"),
        };
    });
    if (modifiedData.length === 0)
        return (<SectionFeedback>
        <Alert severity="info">No employees were found with this status.</Alert>
      </SectionFeedback>);
    console.log(data);
    return (<>
      <ReactVirtualizedTable rows={modifiedData.map((row) => ({
            ...row,
            name: (<NavLink to={`/dashboard/employees/${row._id}`}>{row.name}</NavLink>),
            status: row.status === "duty"
                ? "🟢 Duty"
                : row.status === "vacation"
                    ? "🟡 Vacation"
                    : "🔴 Cancelled",
        }))} columns={expiredIdColumns}/>
      <DownloadButton onClick={() => downloadExpiredIdPDF("Expired ID Report", data.employees)}/>
    </>);
};
export default ExpiredIdReport;
