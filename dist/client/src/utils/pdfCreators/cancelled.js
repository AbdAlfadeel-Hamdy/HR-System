import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { addReportFont } from "./font";
export const downloadCancelledPDF = (title, columns, data) => {
    const doc = new jsPDF();
    addReportFont(doc);
    doc.text(title, 15, 10);
    autoTable(doc, {
        columns: columns.map((col) => ({
            dataKey: col.dataKey,
            header: col.label,
        })),
        body: data,
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
    });
    doc.save(`${title}.pdf`);
};
export const cancelledColumns = [
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
        label: "Cancellation Date",
        dataKey: "cancellationDate",
    },
];
