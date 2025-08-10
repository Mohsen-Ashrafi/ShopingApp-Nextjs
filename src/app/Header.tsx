"use client";

import { useGetUser } from "@/hooks/useAuth";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";

function Header() {
  const { data, isLoading } = useGetUser();
  const user = data?.user;
  // Get number of items in user's cart (from user.cart)
  const cartProducts = data?.user?.cart?.products ?? [];

  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white z-[1000] ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav className="bg-white">
        <div className="container mx-auto px-4 xl:max-w-screen-xl">
          <ul className="flex items-center justify-between py-2 gap-2 sm:gap-6">
            <NavItem
              href="/"
              icon={<HomeIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />}
              label="Home"
            />
            <NavItem
              href="/products"
              icon={<StoreIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />}
              label="Products"
            />
            <NavItem
              href="/profile"
              icon={<AccountCircleIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />}
              label="User Panel"
            />
            <NavItem
              href="/admin"
              icon={<DashboardIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />}
              label="Admin Panel"
            />
            <NavItem
              href="/cart"
              icon={<ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />}
              label={`Cart (${cartProducts.length})`}
            />
            {user ? (
              <span
                className="max-w-[80px] sm:max-w-[150px] truncate font-medium text-sm sm:text-base whitespace-nowrap overflow-hidden"
                title={user.name}
              >
                {user.name}
              </span>
            ) : (
              <NavItem
                href="/auth"
                icon={<LoginIcon sx={{ fontSize: { xs: 24, sm: 20 } }} />}
                label="Sign In"
              />
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, icon, label }) => (
  <li>
    <a
      href={href}
      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md transition-colors duration-200 
                 hover:bg-gray-200 hover:text-[#3c55e0] text-gray-700 text-sm"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  </li>
);
