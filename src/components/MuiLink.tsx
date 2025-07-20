"use client";

import { Button } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const GoToCartLink: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outlined"
        color="primary"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 2,
          py: 1,
        }}
      >
        {children}
      </Button>
    </div>
  );
};

export default GoToCartLink;
