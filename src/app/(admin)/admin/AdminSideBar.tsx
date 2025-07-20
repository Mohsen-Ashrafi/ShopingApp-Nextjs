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
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import React from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const AdminSideBar: React.FC = () => {
  const pathname = usePathname();

  const logoutHandler = async (): Promise<void> => {
    await logout();
    document.location.href = "/";
  };

  const navItems: NavItem[] = [
    { href: "/", label: "Home", icon: <HomeIcon /> },
    { href: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
    { href: "/admin/users", label: "Users", icon: <AccountCircleIcon /> },
    {
      href: "/admin/products",
      label: "Products",
      icon: <Inventory2Icon />,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: <CategoryIcon />,
    },
    {
      href: "/admin/payments",
      label: "Payments",
      icon: <ReceiptLongIcon />,
    },
    {
      href: "/admin/coupons",
      label: "Coupons",
      icon: <LocalOfferIcon />,
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

export default AdminSideBar;


