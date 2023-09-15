import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ReactVirtualizedTable, { ColumnData } from "../components/Table";
import customFetch from "../utils/customFetch";

// PDF Creator
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const downloadPDF = (title: string, columns: any[], data: any) => {
  const doc = new jsPDF();
  doc.text(title, 15, 10);
  data.forEach((company: any) => {
    autoTable(doc, {
      head: [[company._id]],
    });
    autoTable(doc, {
      columns: columns
        .filter((col: any) => col.dataKey !== "workIn")
        .map((col) => ({
          dataKey: col.dataKey,
          header: col.label,
        })),
      body: company.documents.map((row: any) => ({
        idNumber: row.idNumber,
        name: row.name,
        idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
          "en-uk"
        ),
        sponsor: row.sponsor,
        note: row.note,
      })),
      foot: [[`Total: ${company.documents.length}`]],
      showFoot: "lastPage",
    });
  });
  autoTable(doc, {
    foot: [
      [
        dayjs(new Date().toString()).format("dddd"),
        dayjs(new Date().toString()).format("DD/MM/YYYY"),
      ],
    ],
  });

  doc.save(`${title}.pdf`);
};

const columns: ColumnData[] = [
  {
    width: 200,
    label: "ID",
    dataKey: "idNumber",
  },
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },

  {
    width: 200,
    label: "ID Expiration",
    dataKey: "idExpirationDate",
  },
  {
    width: 200,
    label: "Sponsor",
    dataKey: "sponsor",
  },
  {
    width: 200,
    label: "Work In",
    dataKey: "workIn",
  },

  {
    width: 200,
    label: "Note",
    dataKey: "note",
  },
];

interface StatusReportProps {
  status: string;
}

const StatusReport: React.FC<StatusReportProps> = ({ status }) => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/status", {
        params: {
          status,
        },
      });
      return data;
    },
    staleTime: 1000 * 60 * 3,
  });

  if (isFetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const modifiedData = data.employees
    .flatMap((company: any) => company.documents)
    .map((row: any) => {
      return {
        ...row,
        idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
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
        columns={columns}
      />
      <button
        onClick={() => downloadPDF(`${status} Report`, columns, data.employees)}
      >
        Download
      </button>
    </>
  );
};

export default StatusReport;
