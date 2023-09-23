import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";

export const downloadDriverPDF = (
  title: string,
  columns: any[],
  data: any,
  groupBy: string
) => {
  const doc = new jsPDF();
  doc.text(title, 15, 10);
  data.forEach((company: any) => {
    autoTable(doc, {
      head: [[company._id]],
    });
    autoTable(doc, {
      columns: columns
        .filter((col: any) => col.dataKey !== groupBy)
        .map((col) => ({
          dataKey: col.dataKey,
          header: col.label,
        })),
      body: company.documents.map((row: any) => ({
        ...row,
        licenseExpirationDate: row.licenseExpirationDate
          ? dayjs(row.licenseExpirationDate).format("DD/MM/YYYY")
          : "",
      })),
      foot: [[`Total: ${company.documents.length}`]],
      showFoot: "lastPage",
    });
  });
  autoTable(doc, {
    foot: [[dayjs().format("dddd"), dayjs().format("DD/MM/YYYY")]],
  });

  doc.save(`${title}.pdf`);
};

export const driverColumns: ColumnData[] = [
  {
    width: 300,
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
  {
    width: 200,
    label: "Work In",
    dataKey: "workIn",
  },
  {
    width: 200,
    label: "Sponsor",
    dataKey: "sponsor",
  },
];
