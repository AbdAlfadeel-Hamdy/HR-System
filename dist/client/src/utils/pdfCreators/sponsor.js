import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { addReportFont } from "./font";
export const downloadSponsorPDF = (title, data, groupBy, sponsor) => {
    const doc = new jsPDF({ orientation: "l" });
    addReportFont(doc);
    doc.text(`${title} For ${sponsor}`, 15, 10);
    data.forEach((company) => {
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
            body: company.documents.map((row) => [
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
        startY: doc.lastAutoTable.finalY,
    });
    doc.save(`${title}.pdf`);
};
export const sponsorColumns = [
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
