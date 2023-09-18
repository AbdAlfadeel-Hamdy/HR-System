import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";
import customFetch from "../utils/customFetch";
import {
  vacationsColumns,
  downloadVacationsPDF,
} from "../utils/pdfCreators/vacations";
import ReactVirtualizedTable from "../components/Table";
import { SectionFeedback } from "../components";

const VacationsReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["vacations"],
    queryFn: async () => {
      const { data } = await customFetch.get("/vacations");
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

  const modifiedData = data.vacations.map((row: any) => {
    return {
      ...row,
      leavingDate: new Date(row.leavingDate).toLocaleDateString("en-uk"),
      expectedReturnDate: new Date(row.expectedReturnDate).toLocaleDateString(
        "en-uk"
      ),
    };
  });

  return (
    <>
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: <NavLink to={row._id}>{row.name}</NavLink>,
        }))}
        columns={vacationsColumns}
      />
      <button
        onClick={() =>
          downloadVacationsPDF(
            "Vacations Report",
            vacationsColumns,
            modifiedData
          )
        }
      >
        Download
      </button>
    </>
  );
};

export default VacationsReport;
