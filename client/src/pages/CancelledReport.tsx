import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { DownloadButton, SectionFeedback } from "../components";
import {
  cancelledColumns,
  downloadCancelledPDF,
} from "../utils/pdfCreators/cancelled";

const CancelledReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["cancelled"],
    queryFn: async () => {
      const { data } = await customFetch.get("/cancelled");
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

  const modifiedData = data.cancelled.map((row: any) => {
    return {
      ...row,
      cancellationDate: new Date(row.cancellationDate).toLocaleDateString(
        "en-uk"
      ),
    };
  });

  if (modifiedData.length === 0)
    return (
      <SectionFeedback>
        <Alert severity="info">No cancelled employees were found.</Alert>
      </SectionFeedback>
    );

  return (
    <>
      <ReactVirtualizedTable rows={modifiedData} columns={cancelledColumns} />
      <DownloadButton
        onClick={() =>
          downloadCancelledPDF(
            "Cancelled Report",
            cancelledColumns,
            modifiedData
          )
        }
      />
    </>
  );
};

export default CancelledReport;
