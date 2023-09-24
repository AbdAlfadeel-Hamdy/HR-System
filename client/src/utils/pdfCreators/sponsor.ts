import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { ColumnData } from "../../components/Table";
import { addReportFont } from "./font";

export const downloadSponsorPDF = (
  title: string,
  data: any,
  groupBy: string,
  sponsor: string
) => {
  const doc = new jsPDF({ orientation: "l" });
  addReportFont(doc);
  doc.text(`${title} For ${sponsor}`, 15, 10);
  data.forEach((company: any) => {
    autoTable(doc, {
      head: [
        [company._id, "", "", `Total: ${company.documents.length}`, ""],
        [
          "Name",
          "ID",
          "ID Expiration",
          "Status",
          groupBy === "nationality" ? "Work In" : "Nationality",
        ],
      ],
      showHead: "firstPage",
      body: company.documents.map((row: any) => [
        row.name,
        row.idNumber,
        row.idExpirationDate
          ? dayjs(row.idExpirationDate).format("DD/MM/YYYY")
          : "",
        row.status === "duty" ? "On Duty" : "In Vacation",
        groupBy === "nationality" ? row.workIn : row.nationality,
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

export const sponsorColumns: ColumnData[] = [
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
    width: 150,
    label: "Status",
    dataKey: "status",
  },
  {
    width: 200,
    label: "Work In",
    dataKey: "workIn",
  },
  {
    width: 150,
    label: "Nationality",
    dataKey: "nationality",
  },
];
