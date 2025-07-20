import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface CheckBoxProps {
  id?: string;
  name?: string;
  value?: string | number | readonly string[];
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  name,
  value,
  onChange,
  checked,
  label,
}) => {
  return (
    <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            sx={{
              color: "#90caf9",
              "&.Mui-checked": {
                color: "#1976d2",
              },
              padding: "6px",
            }}
          />
        }
        label={label}
        sx={{ margin: 0 }}
      />
    </div>
  );
};

export default CheckBox;
