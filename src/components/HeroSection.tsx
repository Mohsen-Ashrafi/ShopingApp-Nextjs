import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        height: {
          xs: "40vh",
          sm: "60vh",
          md: "70vh",
        },
        backgroundImage:
          'url("https://i.postimg.cc/XYcLr910/shoping-title-image.avif")',
        backgroundSize: {
          xs: "cover",
          md: "100% auto",
        },
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: {
              xs: "1.8rem",
              sm: "2.5rem",
              md: "3rem",
            },
          }}
        >
          Welcome to Your Online Store
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 4, fontSize: { xs: "1rem", sm: "1.2rem" } }}
        >
          Find your favorite products at the best prices
        </Typography>

        <Link href="/products" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Shop Now
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default HeroSection;
