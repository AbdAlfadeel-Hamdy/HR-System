import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";
import { addReportFont } from "./font";

export const downloadVacationsHistoryPDF = (
  title: string,
  columns: any[],
  data: any,
  name: string,
  idNumber: number
) => {
  const doc = new jsPDF({ orientation: "l" });
  addReportFont(doc);
  doc.text(title, 15, 10);
  autoTable(doc, {
    head: [[name, "", idNumber, "", ""]],
    styles: {
      halign: "justify",
      font: "Cairo-Regular",
    },
  });
  autoTable(doc, {
    columns: columns.map((col) => ({
      dataKey: col.dataKey,
      header: col.label,
    })),
    body: data.map((row: any) => ({
      ...row,
      leavingDate: row.leavingDate
        ? dayjs(row.leavingDate).format("DD/MM/YYYY")
        : "",
      expectedReturnDate: row.expectedReturnDate
        ? dayjs(row.expectedReturnDate).format("DD/MM/YYYY")
        : "",
      actualReturnDate: row.actualReturnDate
        ? dayjs(row.actualReturnDate).format("DD/MM/YYYY")
        : "",
    })),
    foot: [
      [
        dayjs(new Date().toString()).format("dddd"),
        dayjs(new Date().toString()).format("DD/MM/YYYY"),
        `Total: ${data.length}`,
      ],
    ],
    showFoot: "lastPage",
    styles: {
      halign: "justify",
      font: "Cairo-Regular",
    },
    startY: (doc as any).lastAutoTable.finalY,
    tableWidth: "auto",
  });
  doc.save(`${title}.pdf`);
};

export const vacationsHistoryColumns: ColumnData[] = [
  {
    width: 200,
    label: "Leaving Date",
    dataKey: "leavingDate",
  },
  {
    width: 200,
    label: "Expected Return",
    dataKey: "expectedReturnDate",
  },
  {
    width: 200,
    label: "Period",
    dataKey: "period",
  },
  {
    width: 200,
    label: "Actual Return",
    dataKey: "actualReturnDate",
  },
  {
    width: 200,
    label: "Actual Period",
    dataKey: "actualPeriod",
  },
];
