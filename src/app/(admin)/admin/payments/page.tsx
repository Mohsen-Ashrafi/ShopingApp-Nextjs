"use client";
import { useGetPayments } from "@/hooks/usePayments";
import PaymentListTable from "./PaymentListTable";
import Loading from "@/common/Loading";
import { JSX } from "react";
import { Payment } from "@/types/payment";
import ResponsiveAdminHeader from "../ResponsiveAdminHeader";

function PaymentsPage(): JSX.Element {
  const { data, isLoading } = useGetPayments();
  const payments: Payment[] = data?.payments || [];

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="my-6">
        <ResponsiveAdminHeader title="Payments" />
      </div>
      <PaymentListTable payments={payments} />
    </div>
  );
}
export default PaymentsPage;
