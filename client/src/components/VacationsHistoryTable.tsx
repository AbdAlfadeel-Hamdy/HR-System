import * as React from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from ".";

interface VacationsHistoryTableProps {
  vacations: {
    _id: string;
    leavingDate: Date;
    expectedReturnDate: Date;
    period: number;
    actualReturnDate: Date;
    actualPeriod: number;
  }[];
}

const VacationsHistoryTable: React.FC<VacationsHistoryTableProps> = ({
  vacations,
}) => {
  const rows = vacations.map((vacation) =>
    createData(
      vacation._id,
      new Date(vacation.leavingDate).toLocaleDateString("en-uk"),
      new Date(vacation.expectedReturnDate).toLocaleDateString("en-uk"),
      vacation.period,
      vacation.actualReturnDate
        ? new Date(vacation.actualReturnDate).toLocaleDateString("en-uk")
        : "",
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
          <StyledTableCell></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.reverse().map((row) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell component="th" scope="row">
              {row.leavingDate}
            </StyledTableCell>
            <StyledTableCell>{row.expectedReturn}</StyledTableCell>
            <StyledTableCell>{row.period}</StyledTableCell>
            <StyledTableCell>{row.actualReturn}</StyledTableCell>
            <StyledTableCell>{row.actualPeriod}</StyledTableCell>
            <StyledTableCell>
              {
                <div className="flex gap-1">
                  <button>edit</button>
                  <button>complete</button>
                </div>
              }
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VacationsHistoryTable;

const createData = (
  _id: string,
  leavingDate: string,
  expectedReturn: string,
  period: number,
  actualReturn: string,
  actualPeriod: number
) => ({
  _id,
  leavingDate,
  expectedReturn,
  period,
  actualReturn,
  actualPeriod,
});
