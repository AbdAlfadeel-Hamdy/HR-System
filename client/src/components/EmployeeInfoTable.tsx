import { Table, TableBody } from "@mui/material";
import { StyledTableCell, StyledTableRow } from ".";

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
      new Date(employee.idExpirationDate).toLocaleDateString("en-uk")
    ),
    createData(
      "Status",
      employee.status === "duty" ? "\uD83D\uDFE2 Duty" : "\uD83D\uDFE1 Vacation"
    ),
    createData("Nationality", employee.nationality),
    createData("Passport", employee.passportNumber),
    createData(
      "Passport Expiration",
      new Date(employee.passportExpirationDate).toLocaleDateString("en-uk")
    ),
    createData("Work In", employee.workIn),
    createData("Sponsor", employee.sponsor),
    createData("License", employee.licenseType),
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
            <StyledTableCell>{row.value}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeInfoTable;
