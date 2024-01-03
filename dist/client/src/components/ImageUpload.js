import { useEffect, useRef, useState } from "react";
const ImageUpload = ({ id, center, onChange,
// errorText,
 }) => {
    const filePickerRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        onChange(id, file, !!file);
    }, [onChange, id, file]);
    const imageChangeHandler = (e) => {
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
    return (<div className="">
      <input id={id} type="file" style={{ display: "none" }} ref={filePickerRef} accept=".jpg,.jpeg,.png,.pdf" onChange={imageChangeHandler}/>
      <div className={`image-upload ${center && "center"}`}>
        <div className="w-12 h-12 border border-gray-100 flex items-center justify-center">
          {previewUrl && (<img src={previewUrl} alt="Preview" className="w-full h-full object-cover"/>)}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {/* {!file && <p>{errorText}</p>} */}
    </div>);
};
export default ImageUpload;
