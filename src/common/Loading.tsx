import React from "react";
import { Box } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        height: "40px",
        width: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              animation: `bounce 0.6s ${i * 0.1}s infinite ease-in-out`,
            }}
          />
        ))}
      </Box>

      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.6;
            } 
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Loading;
