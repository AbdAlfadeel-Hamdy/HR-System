import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";
import { addReportFont } from "./font";

export const downloadPassportPDF = (
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
          "Passport",
          "Passport Expiration",
          groupBy === "sponsor" ? "Nationality" : "Sponsor",
          "Note",
        ],
      ],
      showHead: "firstPage",
      body: company.documents.map((row: any) => [
        row.name,
        row.idNumber,
        row.passportNumber,
        row.passportExpirationDate
          ? dayjs(row.passportExpirationDate).format("DD/MM/YYYY")
          : "",
        groupBy === "sponsor" ? row.nationality : row.sponsor,
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

export const passportColumns: ColumnData[] = [
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
    label: "Nationality",
    dataKey: "nationality",
  },
  {
    width: 200,
    label: "Sponsor",
    dataKey: "sponsor",
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
  {
    width: 200,
    label: "Note",
    dataKey: "note",
  },
];
