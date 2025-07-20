import Providers from "@/app/Providers";
import inter from "@/constants/localFont";
import { Toaster } from "react-hot-toast";
import "../../globals.css";
import AdminSideBar from "./AdminSideBar";

export const metadata = {
  title: "Admin Panel",
  description: "Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} min-h-screen font-sans`}
      >
        <Providers>
          <Toaster />
          <div className="grid grid-cols-1 lg:grid-cols-5 bg-white h-screen">
            <div className="hidden lg:block lg:col-span-1 bg-gray-100 overflow-y-auto p-4">
              <AdminSideBar />
            </div>
            <div className="col-span-1 lg:col-span-4 overflow-y-auto px-2 sm:px-4 py-4">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
