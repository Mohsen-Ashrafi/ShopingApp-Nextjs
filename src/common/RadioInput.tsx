import { FormControlLabel, Radio } from "@mui/material";

interface RadioInputProps {
  id?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  checked: boolean;
  label: string;
}

function RadioInput({
  id,
  name,
  value,
  onChange,
  checked,
  label,
}: RadioInputProps) {
  return (
    <FormControlLabel
      control={
        <Radio
          id={id}
          checked={checked}
          value={value}
          onChange={(e) => onChange(e, e.target.value)}
          name={name}
          color="primary"
          sx={{
            "&.Mui-checked": {
              color: "#2196f3",
            },
          }}
        />
      }
      label={label}
    />
  );
}

export default RadioInput;
