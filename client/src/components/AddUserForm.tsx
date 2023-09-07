import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useMutation } from "@tanstack/react-query";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Name is required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const AddUserForm = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (user: any) => {
      await customFetch.post("/auth/register", user);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);
        toast.success("Created user successfully.");
        resetForm();
      } catch (err) {
        toast.error((err as any)?.response?.data?.message);
      }
    },
  });

  return (
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
          Add User
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
            columnGap: 3,
            rowGap: 0,
            minWidth: "20rem",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
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
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
  );
};

export default AddUserForm;
