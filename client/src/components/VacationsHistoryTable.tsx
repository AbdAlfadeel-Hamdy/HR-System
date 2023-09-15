import * as React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
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
        {rows.reverse().map((row, index) => (
          <StyledTableRow key={row._id}>
            <StyledTableCell component="th" scope="row">
              {row.leavingDate.toString()}
            </StyledTableCell>
            <StyledTableCell>{row.expectedReturnDate}</StyledTableCell>
            <StyledTableCell>{row.period}</StyledTableCell>
            <StyledTableCell>{row.actualReturnDate}</StyledTableCell>
            <StyledTableCell>{row.actualPeriod}</StyledTableCell>
            <StyledTableCell>
              <div className="flex gap-1">
                <Modal btnText="edit">
                  <VacationForm
                    url={`/vacations/${row._id}`}
                    method="PATCH"
                    initialValues={
                      row.actualReturnDate
                        ? {
                            leavingDate: dayjs(row.leavingDate, "DD-MM-YYYY"),
                            expectedReturnDate: dayjs(
                              row.expectedReturnDate,
                              "DD-MM-YYYY"
                            ),
                            actualReturnDate: dayjs(
                              row.actualReturnDate,
                              "DD-MM-YYYY"
                            ),
                          }
                        : {
                            leavingDate: dayjs(row.leavingDate, "DD-MM-YYYY"),
                            expectedReturnDate: dayjs(
                              row.expectedReturnDate,
                              "DD-MM-YYYY"
                            ),
                          }
                    }
                    successFn={successFn}
                    successMsg="Updated vacation Successfully"
                    formTitle="Update Vacation"
                  />
                </Modal>
                {!index && !row.actualReturnDate && (
                  <Modal btnText="complete">
                    <VacationForm
                      url={`/vacations/${row._id}`}
                      method="PATCH"
                      initialValues={{
                        actualReturnDate: dayjs(),
                      }}
                      successFn={successFn}
                      successMsg="Completed vacation Successfully"
                      formTitle="Complete Vacation"
                    />
                  </Modal>
                )}
              </div>
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
  expectedReturnDate: string,
  period: number,
  actualReturnDate: string,
  actualPeriod: number
) => ({
  _id,
  leavingDate,
  expectedReturnDate,
  period,
  actualReturnDate,
  actualPeriod,
});
