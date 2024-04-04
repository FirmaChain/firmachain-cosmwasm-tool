import { TextField } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

type InputType = "text" | "password" | "number" | "email" | "tel" | "url" | "date" | "time" | "datetime-local" | "week" | "month" | "file" | "checkbox" | "radio";

interface IProps {
  placeholder: string;
  value: string | number | null;
  type?: InputType;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  sx?: CSSProperties;
  readOnly?: boolean;
  disabled?: boolean;
  checkValue?: boolean;
  onChange: (value: any) => void;
}

const TextInput = ({ placeholder, value, type = "text", startAdornment = null, endAdornment = null, checkValue = true, readOnly = false, disabled = false, sx = {}, onChange }: IProps) => {
  const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.currentTarget.value;
    onChange(value);
  };

  const inputStyle = {
    "& input": {
      padding: "5px 10px",
      fontSize: "0.7rem",
      ...sx,
    },
    ...(checkValue === false ? {
      "& fieldset": {
        borderColor: "red",
      }
    } : {}),
  };

  return (
    <TextField
      hiddenLabel
      autoComplete={"off"}
      type={type}
      placeholder={placeholder}
      sx={{
        ...inputStyle,
        width: "100%",
      }}
      variant="outlined"
      value={value || ""}
      InputProps={{
        startAdornment,
        endAdornment,
        readOnly,
      }}
      disabled={disabled}
      onChange={onChangeValue}
      onWheel={(event) => event.preventDefault()}
    />
  );
};

export default TextInput;
