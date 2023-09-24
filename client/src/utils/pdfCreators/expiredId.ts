import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";
import { addReportFont } from "./font";

export const downloadExpiredIdPDF = (title: string, data: any) => {
  const doc = new jsPDF({ orientation: "l" });
  addReportFont(doc);
  doc.text(title, 15, 10);
  data.forEach((company: any) => {
    autoTable(doc, {
      head: [
        [
          company._id,
          "",
          "",
          "",
          "",
          `Total: ${company.documents.length}`,
          "",
          "",
        ],
        [
          "Name",
          "ID",
          "ID Expiration",
          "Passport Expiration",
          "Sponsor",
          "Status",
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
        row.passportExpirationDate
          ? dayjs(row.passportExpirationDate).format("DD/MM/YYYY")
          : "",
        row.sponsor,
        row.status === "duty"
          ? "On Duty"
          : row.status === "vacation"
          ? "In Vacation"
          : "Cancelled",
        row.note,
      ]),
      styles: {
        halign: "justify",
        font: "Cairo-Regular",
      },
    });
  });
  autoTable(doc, {
    foot: [
      [
        dayjs(new Date().toString()).format("dddd"),
        dayjs(new Date().toString()).format("DD/MM/YYYY"),
      ],
    ],
    styles: {
      halign: "justify",
      font: "Cairo-Regular",
    },
    startY: (doc as any).lastAutoTable.finalY,
  });

  doc.save(`${title}.pdf`);
};

export const expiredIdColumns: ColumnData[] = [
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
    label: "Passport Expiration",
    dataKey: "passportExpirationDate",
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
    label: "Status",
    dataKey: "status",
  },
  {
    width: 200,
    label: "Note",
    dataKey: "note",
  },
];
