import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";

export const downloadVacationsHistoryPDF = (
  title: string,
  columns: any[],
  data: any,
  name: string,
  idNumber: number
) => {
  const doc = new jsPDF();
  doc.text(title, 15, 10);
  autoTable(doc, {
    head: [[name, idNumber]],
  });
  autoTable(doc, {
    columns: columns.map((col) => ({
      dataKey: col.dataKey,
      header: col.label,
    })),
    body: data.map((row: any) => ({
      ...row,
      leavingDate: new Date(row.leavingDate).toLocaleDateString("en-uk"),
      expectedReturnDate: new Date(row.expectedReturnDate).toLocaleDateString(
        "en-uk"
      ),
      actualReturnDate: new Date(row.actualReturnDate).toLocaleDateString(
        "en-uk"
      ),
    })),
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
