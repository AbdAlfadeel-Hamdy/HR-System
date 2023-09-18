import { FormikErrors } from "formik";

interface IUploadFile {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}

const UploadFile: React.FC<IUploadFile> = ({  setFieldValue, errors }) => {
  return (
    <div>
      <input
        type="file"
        name="image"
        accept="image/png, .svg"
        onChange={(e) => {
          if (e.currentTarget.files) {
            setFieldValue("image", e.currentTarget.files[0]);
          }
        }}
      />
      {errors.image && (
        <>
          <br />
          <span id="error">{errors.image}</span>
          <br />
        </>
      )}
    </div>
  );
};

export default UploadFile;
