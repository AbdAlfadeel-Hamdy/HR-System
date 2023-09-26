import { ReactNode } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  CssBaseline,
  TextField,
  MenuItem,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customFetch from "../utils/customFetch";
import { employeeValidationSchema } from "../utils/validationSchemas";
import { Employee } from "../utils/interfaces";
import { companies, countries } from "../utils/constants";

interface EmployeeFormProps {
  initialValues: Employee;
  method: "POST" | "PATCH";
  url: string;
  successFn?: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  method,
  url,
  successFn,
}) => {
  const { mutateAsync } = useMutation({
    mutationKey: [
      "employees",
      "drivers",
      "passport",
      "duty",
      "vacation",
      "expired-id",
    ],
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
    validationSchema: method === "POST" ? employeeValidationSchema : null,
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
              select
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
            >
              {countries.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
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
              select
              id="sponsor"
              label="Sponsor"
              name="sponsor"
              value={formik.values.sponsor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sponsor && Boolean(formik.errors.sponsor)}
              helperText={formik.touched.sponsor && formik.errors.sponsor}
            >
              {companies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              id="workIn"
              label="Work In"
              name="workIn"
              value={formik.values.workIn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.workIn && Boolean(formik.errors.workIn)}
              helperText={formik.touched.workIn && formik.errors.workIn}
            >
              {companies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
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
              value={formik.values.agreementExpirationDate}
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
                { value: "", label: "Undefined" },
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
              value={formik.values.licenseExpirationDate}
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
            {method === "PATCH" && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="note"
                label="Note"
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
              />
            )}
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

export default EmployeeForm;
