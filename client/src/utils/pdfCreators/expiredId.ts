import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { ColumnData } from "../../components/Table";

export const downloadExpiredIdPDF = (
  title: string,
  columns: any[],
  data: any
) => {
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
        name: row.name,
        idNumber: row.idNumber,
        sponsor: row.sponsor,
        status: row.status,
        idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
          "en-uk"
        ),
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

export const expiredIdColumns: ColumnData[] = [
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
];
