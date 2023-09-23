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

interface StatusFormProps {
  queryFn: UseMutateAsyncFunction<any, unknown, any, unknown>;
  groupByHandler: (groupBy: string) => void;
}

export const StatusForm: React.FC<StatusFormProps> = ({
  queryFn,
  groupByHandler,
}) => {
  const formik = useFormik({
    initialValues: {
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
          gridTemplateColumns: "1fr 0.5fr",
          alignItems: "center",
          columnGap: 3,
          rowGap: 0,
          maxWidth: 600,
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

export default StatusForm;
