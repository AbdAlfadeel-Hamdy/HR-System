import { useEffect, useRef, useState } from "react";

interface ImageUploadProps {
  id: string;
  center?: boolean;
  onChange: (inputId: string, value: File | null, isValid: boolean) => void;
  errorText: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  center,
  onChange,
  // errorText,
}) => {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    onChange(id, file, !!file);
  }, [onChange, id, file]);

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];
      setFile(file);
      if (!file.type.startsWith("image/")) {
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  return (
    <div className="">
      <input
        id={id}
        type="file"
        style={{ display: "none" }}
        ref={filePickerRef}
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={imageChangeHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="w-12 h-12 border border-gray-100 flex items-center justify-center">
          {previewUrl && (
            <img
              src={previewUrl as string}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {/* {!file && <p>{errorText}</p>} */}
    </div>
  );
};

export default ImageUpload;
