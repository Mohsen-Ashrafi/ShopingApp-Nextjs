"use client";
import Loading from "@/common/Loading";
import { useGetPaymentById } from "@/hooks/usePayments";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { Payment } from "@/types/payment";

function PaymentDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetPaymentById(id as string);
  const payment: Payment | null = data?.payment?.[0] ?? null;
  const router = useRouter();

  if (isLoading) return <Loading />;
  if (!payment) return <Alert severity="error">Payment not found</Alert>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 gap-4">
        <div className="flex-1 space-y-2">
          <h1 className="text-xl md:text-2xl font-bold">Payment Detail</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Invoice Number: {payment.invoiceNumber}
          </p>

          <div className="border-t mt-2 pt-2 space-y-1 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <AttachMoneyIcon color="primary" />
              <span>Amount: ${payment.amount}</span>
            </p>
            <p className="flex items-center gap-2">
              <CreditCardIcon color="primary" />
              <span>Payment Method: {payment.paymentMethod}</span>
            </p>
            <p className="flex items-center gap-2">
              {payment.status === "COMPLETED" ? (
                <CheckCircleIcon className="text-green-600" />
              ) : (
                <CancelIcon className="text-red-600" />
              )}
              <span>
                Status:{" "}
                {payment.status === "COMPLETED" ? "Successful" : "Failed"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <AccessTimeIcon color="primary" />
              <span>
                Created At:{" "}
                {dayjs(payment.createdAt).format("YYYY-MM-DD HH:mm")}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <PersonIcon color="primary" />
              <span>
                User: {payment.user.name} ({payment.user.email}) -{" "}
                {payment.user.phoneNumber}
              </span>
            </p>
          </div>

          <div className="border-t mt-2 pt-2 space-y-1">
            <h2 className="text-lg md:text-xl font-semibold">Products</h2>
            <div className="flex flex-wrap gap-2">
              {payment.cart.productDetail.map((product) => (
                <span
                  key={product._id}
                  className="bg-gray-200 rounded px-2 py-0.5 text-xs md:text-sm"
                >
                  {product.title}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-gray-700 text-sm md:text-base">
            {payment.description}
          </p>

          <div className="text-xs md:text-sm text-gray-500 mt-2 border-t pt-2">
            <p>
              Updated: {dayjs(payment.updatedAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p className="truncate">Authority: {payment.authority}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetailPage;
