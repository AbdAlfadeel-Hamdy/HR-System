import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const downloadPDF = (title: string, columns: any[], data: any) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [columns.map((col) => col.label)],
  });
  Object.values;
  autoTable(doc, {
    body: [
      ["test", "number", "hamoksha", "test", "kshhhd", "dkhdh"],
      ["test", "number", "hamoksha", "test", "kshhhd", "dkhdh"],
    ],
    head: [[title, "", "", "", "", ""]],
    columns: columns,
  });
  autoTable(doc, {
    // body: [
    //   data.map((row: any) => [
    //     row[columns[0].dataKey],
    //     row[columns[1].dataKey],
    //     row[columns[2].dataKey],
    //     row[columns[3].dataKey],
    //     row[columns[4].dataKey],
    //     row[columns[5].dataKey],
    //   ]),
    // ],
    body: [
      ["test", "number", "hamoksha", "test", "kshhhd", "dkhdh"],
      ["test", "number", "hamoksha", "test", "kshhhd", "dkhdh"],
    ],
    head: [[title]],
  });
  doc.save(`${title}.pdf`);
};
