import { useField } from "formik";

interface TextInputProps {
  label: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        id={props.id || props.name}
        className="text-input"
        type="text"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
