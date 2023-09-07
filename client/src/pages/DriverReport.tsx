import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import { NavLink } from "react-router-dom";
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
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "ID",
    dataKey: "idNumber",
  },
  {
    width: 200,
    label: "License",
    dataKey: "licenseType",
  },
  {
    width: 200,
    label: "License Expiration",
    dataKey: "licenseExpirationDate",
  },
];

const DriverReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/driver");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isFetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const modifiedData = data.employees.map((row: any) => {
    return {
      ...row,
      licenseExpirationDate: new Date(
        row.licenseExpirationDate
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
        onClick={() => downloadPDF("Driver Report", columns, modifiedData)}
      >
        Download
      </button>
    </>
  );
};

export default DriverReport;
