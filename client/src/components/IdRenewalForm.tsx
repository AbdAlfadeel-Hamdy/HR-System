import { useFormik } from "formik";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  TextField,
  MenuItem,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

interface IdRenewalFormProps {
  queryFn: UseMutateAsyncFunction<any, unknown, any, unknown>;
  groupByHandler: (groupBy: string) => void;
}

export const IdRenewalForm: React.FC<IdRenewalFormProps> = ({
  queryFn,
  groupByHandler,
}) => {
  const formik = useFormik({
    initialValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      groupBy: "workIn",
    },
    onSubmit: async (values) => {
      try {
        await queryFn(values);
        groupByHandler(values.groupBy);
      } catch (err) {
        // toast.error((err as any)?.response?.data?.message);
      }
    },
  });

  return (
    <Container component="main" className="h-full">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        noValidate
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 0.5fr",
          alignItems: "center",
          columnGap: 3,
          rowGap: 0,
          maxWidth: 900,
          marginX: "auto",
        }}
        className="h-full"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          select
          name="month"
          label="month"
          id="month"
          value={formik.values.month}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.month && Boolean(formik.errors.month)}
          helperText={formik.touched.month && formik.errors.month}
          className="bg-white"
        >
          {[
            { value: 1, label: "January" },
            { value: 2, label: "February" },
            { value: 3, label: "March" },
            { value: 4, label: "April" },
            { value: 5, label: "May" },
            { value: 6, label: "June" },
            { value: 7, label: "July" },
            { value: 8, label: "August" },
            { value: 9, label: "September" },
            { value: 10, label: "October" },
            { value: 11, label: "November" },
            { value: 12, label: "December" },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          select
          name="year"
          label="year"
          id="year"
          value={formik.values.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}
        >
          {[
            { value: 2023, label: "2023" },
            { value: 2024, label: "2024" },
            { value: 2025, label: "2025" },
            { value: 2026, label: "2026" },
            { value: 2027, label: "2027" },
            { value: 2028, label: "2028" },
            { value: 2029, label: "2029" },
            { value: 2030, label: "2030" },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          select
          name="groupBy"
          label="Group By"
          id="groupBy"
          value={formik.values.groupBy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.groupBy && Boolean(formik.errors.groupBy)}
          helperText={formik.touched.groupBy && formik.errors.groupBy}
        >
          {[
            { value: "workIn", label: "Work In" },
            { value: "sponsor", label: "Sponsor" },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
    </Container>
  );
};

export default IdRenewalForm;
