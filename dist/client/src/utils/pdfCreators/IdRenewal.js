import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { addReportFont } from "./font";
export const downloadRenewalIdPDF = (title, data, groupBy, renewalDate) => {
    const doc = new jsPDF({
        orientation: "l",
    });
    addReportFont(doc);
    doc.text(`${title} of ${renewalDate}`, 15, 10);
    data.forEach((company) => {
        autoTable(doc, {
            head: [
                [company._id, "", "", "", "", `Total: ${company.documents.length}`, ""],
                [
                    "Name",
                    "ID",
                    "ID Expiration",
                    "Passport Expiration",
                    "Agreement Expiration",
                    groupBy === "sponsor" ? "Work In" : "Sponsor",
                    "Note",
                ],
            ],
            showHead: "firstPage",
            body: company.documents.map((row) => [
                row.name,
                row.idNumber,
                row.idExpirationDate
                    ? dayjs(row.idExpirationDate).format("DD/MM/YYYY")
                    : "",
                row.passportExpirationDate
                    ? dayjs(row.passportExpirationDate).format("DD/MM/YYYY")
                    : "",
                row.agreementExpirationDate
                    ? dayjs(row.agreementExpirationDate).format("DD/MM/YYYY")
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
        startY: doc.lastAutoTable.finalY,
    });
    doc.save(`${title}.pdf`);
};
export const idRenewalColumns = [
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
        label: "Agreement Expiration",
        dataKey: "agreementExpirationDate",
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
