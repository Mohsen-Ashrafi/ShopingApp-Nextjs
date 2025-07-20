"use client";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./PaymentTable";
import Loading from "@/common/Loading";
import { JSX } from "react";
import ResponsiveHeader from "../ResponsiveHeader";

function Payments(): JSX.Element {
  const { data, isLoading } = useGetUser();
  const payments = data?.payments || [];

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
            {/* Header */}
      <ResponsiveHeader title="User Payments" />

      <PaymentTable payments={payments} />
    </div>
  );
}

export default Payments;
