import React from "react";
import { TextField } from "@mui/material";
import styles from "./InputComponentStyle";

const InputComponent = ({
  label,
  placeholder,
  onChange,
  value,
  required,
  multiline,
  maxRows,
}) => {
  return (
    <TextField
      sx={styles.field}
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      multiline={multiline}
      maxRows={maxRows}
    />
  );
};

export default InputComponent;
