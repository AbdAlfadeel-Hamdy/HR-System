import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";
import { addReportFont } from "./font";

export const downloadStatusPDF = (
  title: string,
  data: any,
  groupBy: string
) => {
  const doc = new jsPDF({
    orientation: "l",
  });
  addReportFont(doc);
  doc.text(title, 15, 10);
  data.forEach((company: any) => {
    autoTable(doc, {
      head: [
        [company._id, "", "", `Total: ${company.documents.length}`, ""],
        [
          "Name",
          "ID",
          "ID Expiration",
          groupBy === "sponsor" ? "Work In" : "Sponsor",
          "Note",
        ],
      ],
      showHead: "firstPage",
      body: company.documents.map((row: any) => [
        row.name,
        row.idNumber,
        row.idExpirationDate
          ? dayjs(row.idExpirationDate).format("DD/MM/YYYY")
          : "",
        groupBy === "sponsor" ? row.workIn : row.sponsor,
        row.note,
      ]),
      styles: {
        halign: "justify",
        font: "Cairo-Regular",
      },
    });
  });
  autoTable(doc, {
    foot: [[dayjs().format("dddd"), dayjs().format("DD/MM/YYYY")]],
    styles: {
      halign: "justify",
      font: "Cairo-Regular",
    },
    startY: (doc as any).lastAutoTable.finalY,
  });

  doc.save(`${title}.pdf`);
};

export const statusColumns: ColumnData[] = [
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
