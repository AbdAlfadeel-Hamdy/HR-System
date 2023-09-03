import React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableHeader = () => {
  return (
    <TableRow>
      {columns.map((column) => (
        <StyledTableCell
          key={column.dataKey}
          variant="head"
          align={"left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          {column.label}
        </StyledTableCell>
      ))}
    </TableRow>
  );
};
export default TableHeader;
