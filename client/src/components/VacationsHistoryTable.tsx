import * as React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow, VacationForm, Modal } from ".";

interface VacationsHistoryTableProps {
  vacations: {
    _id: string;
    leavingDate: Date;
    expectedReturnDate: Date;
    period: number;
    actualReturnDate: Date;
    actualPeriod: number;
  }[];
  successFn: () => void;
}

const VacationsHistoryTable: React.FC<VacationsHistoryTableProps> = ({
  vacations,
  successFn,
}) => {
  const rows = vacations.map((vacation) =>
    createData(
      vacation._id,
      dayjs(vacation.leavingDate).format("DD/MM/YYYY"),
      dayjs(vacation.expectedReturnDate).format("DD/MM/YYYY"),
      vacation.period,
      vacation.actualReturnDate
        ? dayjs(vacation.actualReturnDate).format("DD/MM/YYYY")
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
              {row.leavingDate.toString()}
            </StyledTableCell>
            <StyledTableCell>{row.expectedReturn}</StyledTableCell>
            <StyledTableCell>{row.period}</StyledTableCell>
            <StyledTableCell>{row.actualReturn}</StyledTableCell>
            <StyledTableCell>{row.actualPeriod}</StyledTableCell>
            <StyledTableCell>
              <Modal btnIcon={<AddOutlined />} btnText="edit">
                <VacationForm
                  url={`/vacations/${row._id}`}
                  method="PATCH"
                  initialValues={{
                    leavingDate: dayjs(row.leavingDate, "DD-MM-YYYY"),
                    expectedReturnDate: dayjs(row.expectedReturn, "DD-MM-YYYY"),
                  }}
                  successFn={successFn}
                  successMsg="Updated vacation Successfully"
                  formTitle="Update Vacation"
                />
              </Modal>
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
