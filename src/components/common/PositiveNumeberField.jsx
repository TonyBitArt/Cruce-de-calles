import { TextField } from "@mui/material";

const PositiveNumberField = ({ label, value, onChange, isDisabled }) => {
  return (
    <TextField
      label={label}
      type="number"
      variant="outlined"
      size="small"
      value={value}
      fullWidth
      disabled={isDisabled}
      onChange={(e) => {
        console.log(e);
        const valorRaw = e.target.value;
        if (valorRaw === "") {
          onChange("");
          return;
        }
        const numero = Number(valorRaw);
        if (numero >= 1) {
          onChange(numero);
        }
      }}
      onKeyDown={(e) => {
        if (["-", "e", "E", "+", ".", ","].includes(e.key)) {
          e.preventDefault();
        }
      }}
      margin="normal"
    />
  );
};

export default PositiveNumberField;
