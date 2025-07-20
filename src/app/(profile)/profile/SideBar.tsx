"use client";

import { logout } from "@/services/authServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";

const SideBar: React.FC = () => {
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  const navItems = [
    { href: "/", label: "Home", icon: <HomeIcon /> },
    { href: "/profile", label: "Dashboard", icon: <DashboardIcon /> },
    { href: "/profile/me", label: "User Profile", icon: <AccountCircleIcon /> },
    {
      href: "/profile/payments",
      label: "Payments",
      icon: <ShoppingCartIcon />,
    },
  ];

  return (
    <Box
      sx={{
        width: 240,
        paddingY: 2,
        paddingX: 1,
        borderRight: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List component="nav" sx={{ flexGrow: 1 }}>
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <ListItemButton
              key={index}
              component={Link}
              href={item.href}
              selected={isActive}
              sx={{
                borderBottom: "1px solid #eee",
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: "#e0f7fa",
                  "&:hover": {
                    backgroundColor: "#b2ebf2",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}

        <Divider sx={{ my: 2 }} />

        <ListItemButton onClick={logoutHandler}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Exit" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SideBar;

