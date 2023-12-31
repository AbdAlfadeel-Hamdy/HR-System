import dayjs from "dayjs";
import { Table, TableBody } from "@mui/material";
import { Visibility, Edit, AddPhotoAlternate } from "@mui/icons-material";
import { Modal, StyledTableCell, StyledTableRow, UploadFile } from ".";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

interface EmployeeInfoTableProps {
  employee: { [key: string]: any };
  refetch: () => void;
}

const EmployeeInfoTable: React.FC<EmployeeInfoTableProps> = ({
  employee,
  refetch,
}) => {
  const [idImageFile, setIdImageFile] = useState<File | null>(null);
  const [passportImageFile, setPassportImageFile] = useState<File | null>(null);
  const { mutateAsync } = useMutation({
    mutationFn: async (variables: {
      uploadedFile: File | null;
      fileName: string;
    }) => {
      const formData = new FormData();
      if (!variables.uploadedFile)
        throw new Error("Please select a file to upload");
      formData.set("uploadedFile", variables.uploadedFile);
      formData.set("fieldName", variables.fileName);
      await customFetch.patch(`/employees/${employee._id}`, formData);
    },
    onSuccess: () => {
      toast.success("File was uploaded successfully");
      refetch();
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Please select a file to upload"
      );
    },
  });
  const changeIdImageHandler = (file: File | null) => {
    setIdImageFile(file);
  };
  const changePassportImageHandler = (file: File | null) => {
    setPassportImageFile(file);
  };
  const rows = createRows(employee);
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
                <div className="flex items-center justify-between">
                  <span>{row.value}</span>
                  <div className="flex items-center gap-1">
                    <Modal
                      btnIcon={
                        employee.idImage ? <Edit /> : <AddPhotoAlternate />
                      }
                      feedback
                      feedbackFn={() =>
                        mutateAsync({
                          uploadedFile: idImageFile,
                          fileName: "idImage",
                        })
                      }
                    >
                      <UploadFile onChange={changeIdImageHandler} />
                      <div>{idImageFile?.name}</div>
                    </Modal>
                    {employee.idImage && (
                      <Modal btnIcon={<Visibility />}>
                        <embed
                          src={employee.idImage}
                          type="application/pdf"
                          className="w-full h-[400px]"
                        />
                      </Modal>
                    )}
                  </div>
                </div>
              ) : row.name === "Passport" ? (
                <div className="flex items-center justify-between">
                  <span>{row.value}</span>
                  <div className="flex items-center gap-1">
                    <Modal
                      btnIcon={
                        employee.idImage ? <Edit /> : <AddPhotoAlternate />
                      }
                      feedback
                      feedbackFn={() =>
                        mutateAsync({
                          uploadedFile: passportImageFile,
                          fileName: "passportImage",
                        })
                      }
                    >
                      <UploadFile onChange={changePassportImageHandler} />
                      <div>{passportImageFile?.name}</div>
                    </Modal>
                    {employee.passportImage && (
                      <Modal btnIcon={<Visibility />}>
                        <embed
                          src={employee.passportImage}
                          type="application/pdf"
                          className="w-full h-[400px]"
                        />
                      </Modal>
                    )}
                  </div>
                </div>
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

const createData = (name: string, value: string | number) => {
  return { name, value };
};

const createRows = (employee: any) => [
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
    employee.status === "duty"
      ? "🟢 Duty"
      : employee.status === "vacation"
      ? "🟡 Vacation"
      : "🔴 Cancelled"
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
  createData("Note", employee.note),
];
