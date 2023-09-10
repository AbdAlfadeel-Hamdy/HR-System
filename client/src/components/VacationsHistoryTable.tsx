import * as React from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from ".";

function createData(
  leavingDate: string,
  expectedReturn: string,
  period: number,
  actualReturn: string,
  actualPeriod: number
) {
  return { leavingDate, expectedReturn, period, actualReturn, actualPeriod };
}
interface VacationsHistoryTableProps {
  vacations: {
    leavingDate: Date;
    expectedReturn: Date;
    period: number;
    actualReturn: Date;
    actualPeriod: number;
  }[];
}

const VacationsHistoryTable: React.FC<VacationsHistoryTableProps> = ({
  vacations,
}) => {
  const rows = vacations.map((vacation) =>
    createData(
      new Date(vacation.leavingDate).toLocaleDateString("en-uk"),
      new Date(vacation.expectedReturn).toLocaleDateString("en-uk"),
      vacation.period,
      new Date(vacation.actualReturn).toLocaleDateString("en-uk"),
      vacation.actualPeriod
    )
  );
  return (
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Leaving Date</StyledTableCell>
          <StyledTableCell>Expected Return</StyledTableCell>
          <StyledTableCell>Period</StyledTableCell>
          <StyledTableCell>Actual Return</StyledTableCell>
          <StyledTableCell>Actual Period</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.leavingDate}>
            <StyledTableCell component="th" scope="row">
              {row.leavingDate}
            </StyledTableCell>
            <StyledTableCell>{row.expectedReturn}</StyledTableCell>
            <StyledTableCell>{row.period}</StyledTableCell>
            <StyledTableCell>{row.actualReturn}</StyledTableCell>
            <StyledTableCell>{row.actualPeriod}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VacationsHistoryTable;
