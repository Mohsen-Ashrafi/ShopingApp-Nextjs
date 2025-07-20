"use client";

import { ReactNode, useState } from "react";
import { Drawer, IconButton, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AdminSideBar from "./AdminSideBar";

type ResponsiveAdminHeaderProps = {
  title: string;
  children?: ReactNode;
};

function ResponsiveAdminHeader({
  title,
  children,
}: ResponsiveAdminHeaderProps) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        flexWrap="wrap"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            className="text-sm sm:text-xl"
          >
            {title}
          </Typography>
          {children}
        </Box>

        <IconButton
          sx={{ display: { lg: "none" } }}
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Drawer
        anchor="left"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "background.paper",
          },
        }}
      >
        <AdminSideBar />
      </Drawer>
    </>
  );
}

export default ResponsiveAdminHeader;
