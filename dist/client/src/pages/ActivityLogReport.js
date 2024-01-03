import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import useCurrentUser from "../hooks/useCurrentUser";
import { activityLogColumns, downloadActivityLogPDF, } from "../utils/pdfCreators/activityLog";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback, DownloadButton } from "../components";
const ActivityLogReport = () => {
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    useEffect(() => {
        if (user.role !== "admin")
            navigate("/dashboard", { replace: true });
    }, [user.role, navigate]);
    const { isFetching, data, error } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const { data } = await customFetch.get("/auth/activities");
            return data;
        },
    });
    if (isFetching)
        return (<SectionFeedback>
        <CircularProgress />
      </SectionFeedback>);
    if (error)
        return (<SectionFeedback>
        <Alert severity="error">{error.response.data.message}</Alert>
      </SectionFeedback>);
    const modifiedData = data.activities.map((row) => {
        return {
            ...row,
            timeStamp: `${dayjs(new Date(row.timeStamp)).format("dddd, DD MMM YYYY hh:mm:ss A")}`,
        };
    });
    return (<>
      <ReactVirtualizedTable rows={modifiedData.reverse()} columns={activityLogColumns}/>
      <DownloadButton onClick={() => downloadActivityLogPDF("Activity Report", activityLogColumns, modifiedData)}/>
    </>);
};
export default ActivityLogReport;
