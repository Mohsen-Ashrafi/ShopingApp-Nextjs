"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./payments/PaymentTable";
import Link from "next/link";
import { JSX } from "react";
import { Typography } from "@mui/material";
import ResponsiveHeader from "./ResponsiveHeader";

function Profile(): JSX.Element {
  const { data, isLoading } = useGetUser();

  if (isLoading || !data || !data.user) return <Loading />;

  const { user, payments = [] } = data;

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="max-w-7xl mx-auto px-2 py-6">
      {/* Header */}
      <ResponsiveHeader title={`${user.name}, welcome to your page.`}>
        <Typography
          variant="body2"
          className="text-xs sm:text-sm text-gray-600"
        >
          <span className="font-semibold">Account created on:</span>
          {formattedDate}
        </Typography>
      </ResponsiveHeader>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <h2 className="font-bold text-base sm:text-lg">Your latest orders</h2>
          <Link
            href="/profile/payments"
            className="text-blue-600 hover:underline text-sm"
          >
            View all orders
          </Link>
        </div>

        <div className="overflow-x-auto">
          <PaymentTable
            payments={payments
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 3)}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
