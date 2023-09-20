import dayjs from "dayjs";
import { Table, TableBody } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { Modal, StyledTableCell, StyledTableRow, UploadFile } from ".";

interface EmployeeInfoTableProps {
  employee: { [key: string]: any };
}

const EmployeeInfoTable: React.FC<EmployeeInfoTableProps> = ({ employee }) => {
  function createData(name: string, value: string | number) {
    return { name, value };
  }

  const rows = [
    createData("Name", employee.name),
    createData("ID", employee.idNumber),
    createData(
      "ID Expiration",
      employee.idExpirationDate
        ? dayjs(employee.idExpirationDate).format("DD/MM/YYYY")
        : ""
    ),
    createData(
      "Status",
      employee.status === "duty" ? "\uD83D\uDFE2 Duty" : "\uD83D\uDFE1 Vacation"
    ),
    createData("Nationality", employee.nationality),
    createData("Passport", employee.passportNumber),
    createData(
      "Passport Expiration",
      employee.passportExpirationDate
        ? dayjs(employee.passportExpirationDate).format("DD/MM/YYYY")
        : ""
    ),
    createData("Work In", employee.workIn),
    createData("Sponsor", employee.sponsor),
    createData("License", employee.licenseType),
    createData(
      "License Expiration",
      employee.licenseExpirationDate
        ? dayjs(employee.licenseExpirationDate).format("DD/MM/YYYY")
        : ""
    ),
    createData(
      "Agreement Expiration",
      employee.agreementExpirationDate
        ? dayjs(employee.agreementExpirationDate).format("DD/MM/YYYY")
        : ""
    ),
  ];
  return (
    <Table aria-label="simple table">
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell>
              {row.name === "ID" ? (
                <div className="flex items-center gap-4">
                  <span>{row.value}</span>
                  <Modal btnIcon={<AddOutlined />} feedback>
                    <UploadFile />
                  </Modal>
                </div>
              ) : row.name === "Passport" ? (
                <div>Test</div>
              ) : (
                row.value
              )}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeInfoTable;
