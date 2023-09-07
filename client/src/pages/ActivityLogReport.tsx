import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { ColumnData } from "../components/Table";
import dayjs from "dayjs";

// PDF Creator
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const downloadPDF = (title: string, columns: any[], data: any) => {
  const doc = new jsPDF();
  doc.text(title, 15, 10);
  autoTable(doc, {
    columns: columns.map((col) => ({
      dataKey: col.dataKey,
      header: col.label,
    })),
    body: data,
    foot: [
      [
        dayjs(new Date().toString()).format("dddd"),
        dayjs(new Date().toString()).format("DD/MM/YYYY"),
        `Total: ${data.length}`,
      ],
    ],
    showFoot: "lastPage",
  });
  doc.save(`${title}.pdf`);
};

const columns: ColumnData[] = [
  {
    width: 200,
    label: "User Name",
    dataKey: "userName",
  },
  {
    width: 200,
    label: "Activity",
    dataKey: "activity",
  },
  {
    width: 200,
    label: "Time Stamp",
    dataKey: "timeStamp",
  },
];

const ActivityLogReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/activities");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isFetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

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
      <ReactVirtualizedTable rows={modifiedData} columns={columns} />
      <button
        onClick={() => downloadPDF("Activity Report", columns, modifiedData)}
      >
        Download
      </button>
    </>
  );
};

export default ActivityLogReport;
