import { ReactNode } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { CssBaseline, Box, Typography, Container } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customFetch from "../utils/customFetch";
import { vacationValidationSchema } from "../utils/validationSchemas";

interface VacationFormProps {
  initialValues: {
    idNumber?: number;
    employeeName?: string;
    leavingDate?: Dayjs | null;
    expectedReturnDate?: Dayjs | null;
    actualReturnDate?: Dayjs | null;
  };
  method: "POST" | "PATCH";
  url: string;
  successMsg: string;
  formTitle: string;
  successFn?: () => void;
}

export const VacationForm: React.FC<VacationFormProps> = ({
  initialValues,
  method,
  url,
  successFn,
  successMsg,
  formTitle,
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
    validationSchema: initialValues.leavingDate
      ? vacationValidationSchema
      : null,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);
        toast.success(successMsg);
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
            {formTitle}
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
            {initialValues.leavingDate && (
              <DatePicker
                label="Leaving Date"
                format="DD/MM/YYYY"
                value={formik.values.leavingDate}
                onChange={(value) => {
                  formik.setFieldValue("leavingDate", value, true);
                }}
                slotProps={{
                  textField: {
                    margin: "normal",
                    variant: "outlined",
                    onBlur: () => formik.setFieldTouched("leavingDate", true),
                    error:
                      formik.touched.leavingDate &&
                      Boolean(formik.errors.leavingDate),
                    helperText:
                      formik.touched.leavingDate &&
                      (formik.errors.leavingDate as ReactNode),
                  },
                }}
              />
            )}
            {initialValues.expectedReturnDate && (
              <DatePicker
                label="Expected Return Date"
                format="DD/MM/YYYY"
                value={formik.values.expectedReturnDate}
                onChange={(value) => {
                  formik.setFieldValue("expectedReturnDate", value, true);
                }}
                slotProps={{
                  textField: {
                    margin: "normal",
                    variant: "outlined",
                    onBlur: () =>
                      formik.setFieldTouched("expectedReturnDate", true),
                    error:
                      formik.touched.expectedReturnDate &&
                      Boolean(formik.errors.expectedReturnDate),
                    helperText:
                      formik.touched.expectedReturnDate &&
                      (formik.errors.expectedReturnDate as ReactNode),
                  },
                }}
              />
            )}
            {initialValues.actualReturnDate && (
              <DatePicker
                label="Actual Return Date"
                format="DD/MM/YYYY"
                value={formik.values.actualReturnDate}
                onChange={(value) => {
                  formik.setFieldValue("actualReturnDate", value, true);
                }}
                slotProps={{
                  textField: {
                    margin: "normal",
                    variant: "outlined",
                    onBlur: () =>
                      formik.setFieldTouched("actualReturnDate", true),
                    error:
                      formik.touched.actualReturnDate &&
                      Boolean(formik.errors.actualReturnDate),
                    helperText:
                      formik.touched.actualReturnDate &&
                      (formik.errors.actualReturnDate as ReactNode),
                  },
                }}
              />
            )}
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
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

export default VacationForm;
