import React from "react";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

interface Props extends Omit<TextFieldProps, "variant"> {
  label: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <MuiTextField
      fullWidth
      label={label}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      variant="outlined"
      margin="normal"
      {...rest}
    />
  );
};

export default TextField;
