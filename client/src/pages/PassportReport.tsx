import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable, { ColumnData } from "../components/Table";

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
        .filter((col: any) => col.dataKey !== "nationality")
        .map((col) => ({
          dataKey: col.dataKey,
          header: col.label,
        })),
      body: company.documents.map((row: any) => ({
        name: row.name,
        idNumber: row.idNumber,
        passportNumber: row.passportNumber,
        passportExpirationDate: new Date(
          row.passportExpirationDate
        ).toLocaleDateString("en-uk"),
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
    label: "Nationality",
    dataKey: "nationality",
  },
  {
    width: 200,
    label: "Passport",
    dataKey: "passportNumber",
  },
  {
    width: 200,
    label: "Passport Expiration",
    dataKey: "passportExpirationDate",
  },
];

const ExpiredIdReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/passport");
      return data;
    },
    staleTime: 1000 * 60 * 3,
  });

  if (isFetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  console.log(data);

  const modifiedData = data.employees
    .flatMap((company: any) => company.documents)
    .map((row: any) => {
      return {
        ...row,
        passportExpirationDate: new Date(
          row.passportExpirationDate
        ).toLocaleDateString("en-uk"),
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
        onClick={() => downloadPDF("Passport Report", columns, data.employees)}
      >
        Download
      </button>
    </>
  );
};

export default ExpiredIdReport;
