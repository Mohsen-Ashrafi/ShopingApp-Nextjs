import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      size="medium"
      sx={{
        width: "100%",
        borderRadius: 2,
        paddingX: 3,
        paddingY: 1.5,
        textTransform: "none",
        fontWeight: "medium",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
