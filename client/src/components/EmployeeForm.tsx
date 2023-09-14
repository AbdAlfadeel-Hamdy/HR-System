import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import { Dayjs } from "dayjs";

const validationSchema = yup.object({
  idNumber: yup.string().required("ID Number is required"),
  idExpirationDate: yup
    .date()
    .required("ID Expiration Date is required")
    .typeError("Invalid format"),
  name: yup.string().required("Name is required"),
  nationality: yup.string().required("Nationality is required"),
  passportNumber: yup.string().required("Passport Number is required"),
  passportExpirationDate: yup
    .date()
    .required("Expiration Date is required")
    .typeError("Invalid date format"),
  sponsor: yup.string().required("Sponsor is required"),
  workIn: yup.string().required("Work In is required"),
  agreementExpirationDate: yup
    .date()
    .required("Expiration Date is required")
    .typeError("Invalid format"),
  status: yup
    .string()
    .oneOf(["duty", "vacation", "cancelled"])
    .required("Status is required"),
  licenseExpirationDate: yup.date().required("Expiration Date is required"),
  licenseType: yup
    .string()
    .oneOf(["Car", "Truck", "Car&Truck"])
    .required("License Type is required"),
});

interface AddEmployeeFormProps {
  initialValues: {
    idNumber: string;
    idExpirationDate: Dayjs;
    name: string;
    nationality: string;
    passportNumber: string;
    passportExpirationDate: Dayjs;
    sponsor: string;
    workIn: string;
    agreementExpirationDate: Dayjs;
    status: "duty" | "vacation" | "cancelled";
    licenseExpirationDate: Dayjs;
    licenseType: "Car" | "Truck" | "Car&Truck";
  };
  method: "POST" | "PATCH";
  url: string;
  successFn?: () => void;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  initialValues,
  method,
  url,
  successFn,
}) => {
  const { mutateAsync } = useMutation({
    mutationKey: ["employee"],
    mutationFn: async (employee: any) => {
      await customFetch(url, {
        method,
        data: employee,
      });
    },
    onSuccess: successFn,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync({
          ...values,
          idNumber: +values.idNumber,
        });
        toast.success(
          `${method === "POST" ? "Created" : "Updated"} employee successfully.`
        );
        resetForm();
      } catch (err) {
        toast.error((err as any)?.response?.data?.message);
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {method === "POST" ? "Add" : "Update"} Employee
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            noValidate
            sx={{
              mt: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 3,
              rowGap: 0,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="idNumber"
              label="ID Number"
              name="idNumber"
              type="number"
              autoFocus
              value={formik.values.idNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
              helperText={formik.touched.idNumber && formik.errors.idNumber}
            />
            <DatePicker
              label="ID Expiration Date"
              format="DD/MM/YYYY"
              value={formik.values.idExpirationDate}
              onChange={(value) => {
                formik.setFieldValue("idExpirationDate", value, true);
              }}
              slotProps={{
                textField: {
                  margin: "normal",
                  variant: "outlined",
                  onBlur: () =>
                    formik.setFieldTouched("idExpirationDate", true),
                  error:
                    formik.touched.idExpirationDate &&
                    Boolean(formik.errors.idExpirationDate),
                  helperText:
                    formik.touched.idExpirationDate &&
                    (formik.errors.idExpirationDate as ReactNode),
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nationality"
              label="Nationality"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nationality && Boolean(formik.errors.nationality)
              }
              helperText={
                formik.touched.nationality && formik.errors.nationality
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="passportNumber"
              label="Passport Number"
              name="passportNumber"
              value={formik.values.passportNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.passportNumber &&
                Boolean(formik.errors.passportNumber)
              }
              helperText={
                formik.touched.passportNumber && formik.errors.passportNumber
              }
            />
            <DatePicker
              label="Passport Expiration Date"
              format="DD/MM/YYYY"
              value={formik.values.idExpirationDate}
              onChange={(value) => {
                formik.setFieldValue("passportExpirationDate", value, true);
              }}
              slotProps={{
                textField: {
                  margin: "normal",
                  variant: "outlined",
                  onBlur: () =>
                    formik.setFieldTouched("passportExpirationDate", true),
                  error:
                    formik.touched.passportExpirationDate &&
                    Boolean(formik.errors.passportExpirationDate),
                  helperText:
                    formik.touched.passportExpirationDate &&
                    (formik.errors.passportExpirationDate as ReactNode),
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sponsor"
              label="Sponsor"
              name="sponsor"
              value={formik.values.sponsor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sponsor && Boolean(formik.errors.sponsor)}
              helperText={formik.touched.sponsor && formik.errors.sponsor}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="workIn"
              label="Work In"
              name="workIn"
              value={formik.values.workIn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.workIn && Boolean(formik.errors.workIn)}
              helperText={formik.touched.workIn && formik.errors.workIn}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="status"
              label="Status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              {[
                { value: "duty", label: "On Duty" },
                { value: "vacation", label: "On Vacation" },
                { value: "cancelled", label: "Cancelled" },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Agreement Expiration Date"
              format="DD/MM/YYYY"
              value={formik.values.idExpirationDate}
              onChange={(value) => {
                formik.setFieldValue("agreementExpirationDate", value, true);
              }}
              slotProps={{
                textField: {
                  margin: "normal",
                  variant: "outlined",
                  onBlur: () =>
                    formik.setFieldTouched("agreementExpirationDate", true),
                  error:
                    formik.touched.agreementExpirationDate &&
                    Boolean(formik.errors.agreementExpirationDate),
                  helperText:
                    formik.touched.agreementExpirationDate &&
                    (formik.errors.agreementExpirationDate as ReactNode),
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="licenseType"
              label="License"
              id="licenseType"
              value={formik.values.licenseType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.licenseType && Boolean(formik.errors.licenseType)
              }
              helperText={
                formik.touched.licenseType && formik.errors.licenseType
              }
            >
              {[
                { value: "Car", label: "Car" },
                { value: "Truck", label: "Truck" },
                { value: "Car&Truck", label: "Car & Truck" },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="License Expiration Date"
              format="DD/MM/YYYY"
              value={formik.values.idExpirationDate}
              onChange={(value) => {
                formik.setFieldValue("licenseExpirationDate", value, true);
              }}
              slotProps={{
                textField: {
                  margin: "normal",
                  variant: "outlined",
                  onBlur: () =>
                    formik.setFieldTouched("licenseExpirationDate", true),
                  error:
                    formik.touched.licenseExpirationDate &&
                    Boolean(formik.errors.licenseExpirationDate),
                  helperText:
                    formik.touched.licenseExpirationDate &&
                    (formik.errors.licenseExpirationDate as ReactNode),
                },
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            >
              <span>Submit</span>
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default AddEmployeeForm;
