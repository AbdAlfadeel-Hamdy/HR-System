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
import { months } from "../utils/constants";

interface IdRenewalFormProps {
  queryFn: UseMutateAsyncFunction<any, unknown, any, unknown>;
  groupByHandler: (groupBy: string) => void;
  renewalDateHandler: (renewalDate: string) => void;
}

export const IdRenewalForm: React.FC<IdRenewalFormProps> = ({
  queryFn,
  groupByHandler,
  renewalDateHandler,
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
        renewalDateHandler(`${months[values.month - 1].label} ${values.year}`);
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
          label="Month"
          id="month"
          value={formik.values.month}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.month && Boolean(formik.errors.month)}
          helperText={formik.touched.month && formik.errors.month}
          className="bg-white"
        >
          {months.map((option) => (
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
          label="Year"
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
