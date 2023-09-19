import * as React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { Delete, Edit, Done } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow, VacationForm, Modal } from ".";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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

  const { mutateAsync: deleteVacationHandler, isLoading } = useMutation({
    mutationKey: ["employee", "vacations"],
    mutationFn: async (vacationId: string) => {
      await customFetch.delete(`/vacations/${vacationId}`);
    },
    onSuccess: () => {
      toast.success("Deleted vacation successfully");
      successFn();
    },
    onError: (err) => {
      toast.error((err as any).response.data.message);
    },
  });

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
              <div className="flex gap-1 items-center">
                <Modal
                  btnIcon={<Edit className="flex justify-center" />}
                  btnColor="inherit"
                  btnVariant="text"
                >
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
                <Modal
                  btnIcon={<Delete />}
                  btnColor="error"
                  btnVariant="text"
                  feedback
                  feedbackTitle="Are you sure that you want to delete this vacation?"
                  feedbackFn={() => deleteVacationHandler(row._id)}
                  feedbackFnLoading={isLoading}
                />

                {!index && !row.actualReturnDate && (
                  <Modal
                    btnIcon={<Done />}
                    btnColor="success"
                    btnVariant="text"
                  >
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
