import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { CssBaseline, Box, Typography, Container } from "@mui/material";
import customFetch from "../utils/customFetch";
import UploadFile from "./UploadFile";

interface UploadFileFormProps {
  initialValues: {
    idImage: File | null;
  };
  url: string;
  successMsg: string;
  formTitle: string;
  successFn?: () => void;
}

export const UploadFileForm: React.FC<UploadFileFormProps> = ({
  url,
  successFn,
  successMsg,
  formTitle,
}) => {
  const { mutateAsync } = useMutation({
    mutationKey: ["employee"],
    mutationFn: async (employee: any) => {
      await customFetch.patch(url, {
        employee,
      });
    },
    onSuccess: successFn,
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
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
            gridTemplateColumns: "1fr",
            columnGap: 3,
            rowGap: 0,
          }}
        >
          <UploadFile
            data={formik.values}
            errors={formik.errors}
            setFieldValue={formik.setFieldValue}
          />
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
  );
};

export default UploadFileForm;
