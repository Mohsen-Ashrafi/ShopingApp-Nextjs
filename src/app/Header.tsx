"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

function Header() {
  const { data, isLoading } = useGetUser();
  const user = data?.user;
  // Get number of items in user's cart (from user.cart)
  const cartProducts = data?.user?.cart?.products ?? [];

  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white z-10 ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl gap-6">
          <NavItem
            href="/"
            icon={<HomeIcon fontSize="inherit" />}
            label="Home"
          />
          <NavItem
            href="/products"
            icon={<StoreIcon fontSize="inherit" />}
            label="Products"
          />
          <NavItem
            href="/profile"
            icon={<AccountCircleIcon fontSize="inherit" />}
            label="User Panel"
          />
          <NavItem
            href="/admin"
            icon={<DashboardIcon fontSize="inherit" />}
            label="Admin Panel"
          />
          <NavItem
            href="/cart"
            icon={<ShoppingCartIcon fontSize="inherit" />}
            label={`Cart (${cartProducts.length})`}
          />
          {user ? (
            <span
              className="max-w-[90px] sm:max-w-[150px] truncate font-semibold text-sm sm:text-base"
              title={user.name}
            >
              {user.name}
            </span>
          ) : (
            <NavItem
              href="/auth"
              icon={<LoginIcon fontSize="inherit" />}
              label="Sign In"
            />
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li>
      <Link href={href} className="flex items-center gap-1 py-2 sm:mx-0 mx-2">
        <span className="text-[24px] sm:text-[18px] align-middle">{icon}</span>
        <span className="hidden sm:inline align-middle relative top-[1px]">
          {label}
        </span>
      </Link>
    </li>
  );
}
