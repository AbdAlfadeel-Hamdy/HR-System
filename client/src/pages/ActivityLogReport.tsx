import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import {
  activityLogColumns,
  downloadActivityLogPDF,
} from "../utils/pdfCreators/activityLog";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback, DownloadButton } from "../components";

const ActivityLogReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/activities");
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

  const modifiedData = data.activities.map((row: any) => {
    return {
      ...row,
      timeStamp: `${dayjs(new Date(row.timeStamp)).format(
        "dddd, DD MMM YYYY hh:mm:ss A"
      )}`,
    };
  });

  return (
    <>
      <ReactVirtualizedTable rows={modifiedData} columns={activityLogColumns} />
      <DownloadButton
        onClick={() =>
          downloadActivityLogPDF(
            "Activity Report",
            activityLogColumns,
            modifiedData
          )
        }
      />
    </>
  );
};

export default ActivityLogReport;
