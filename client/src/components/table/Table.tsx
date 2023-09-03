import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { styled } from "@mui/material/styles";
import TableHeader from "./TableHeader";

interface Data {
  name: string;
  nationality: string;
  idNumber: number;
  idExpirationDate: string;
  passportNumber: string;
  passportExpirationDate: string;
  sponsor: string;
  workIn: string;
  agreementExpirationDate: string;
  licenseExpirationDate: string;
  licenseType: string;
  status: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "Nationality",
    dataKey: "nationality",
  },
  {
    width: 200,
    label: "ID",
    dataKey: "idNumber",
    numeric: true,
  },
  {
    width: 200,
    label: "ID Expiration Date",
    dataKey: "idExpirationDate",
    numeric: true,
  },
  {
    width: 200,
    label: "Passport",
    dataKey: "passportNumber",
  },
  {
    width: 200,
    label: "Passport Expiration Date",
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
    label: "Agreement Expiration Date",
    dataKey: "agreementExpirationDate",
  },
  {
    width: 200,
    label: "License Expiration Date",
    dataKey: "licenseExpirationDate",
  },
  {
    width: 200,
    label: "License Type",
    dataKey: "licenseType",
  },
  {
    width: 200,
    label: "Status",
    dataKey: "status",
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <StyledTableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align={"left"}>
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

interface ReactVirtualizedTableProps {
  rows: any[];
}

const ReactVirtualizedTable: React.FC<ReactVirtualizedTableProps> = ({
  rows,
}) => {
  return (
    <Paper>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={TableHeader}
        itemContent={rowContent}
      />
      {/* <BasicPagination /> */}
    </Paper>
  );
};

export default ReactVirtualizedTable;
