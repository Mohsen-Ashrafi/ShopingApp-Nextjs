import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

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
    <RadioGroup name={name} value={value} onChange={onChange} row>
      <FormControlLabel
        control={
          <Radio
            id={id}
            checked={checked}
            value={value}
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
    </RadioGroup>
  );
}

export default RadioInput;
