"use client";
import Loading from "@/common/Loading";
import { useGetOneCoupon } from "@/hooks/useCoupons";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import DiscountIcon from "@mui/icons-material/Discount";
import PercentIcon from "@mui/icons-material/Percent";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { CouponResponse } from "@/types/coupon";
import React from "react";

const CouponDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneCoupon(id as string);
  const coupon = (data as CouponResponse)?.coupon;
  const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 gap-4">
        <div className="flex-1 space-y-2 text-sm sm:text-base">
          <h1 className="text-xl sm:text-2xl font-bold">{coupon.code}</h1>

          <p className="flex items-center gap-2 text-gray-600">
            {coupon.type === "percent" ? (
              <>
                <PercentIcon color="primary" />
                <span>Type: Percent Discount</span>
              </>
            ) : (
              <>
                <DiscountIcon color="primary" />
                <span>Type: Fixed Amount</span>
              </>
            )}
          </p>

          <div className="border-t mt-2 pt-2 space-y-1">
            <p className="flex items-center gap-2">
              <DiscountIcon color="primary" />
              <span>
                Amount: {coupon.amount} {coupon.type === "percent" ? "%" : "$"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Inventory2Icon color="primary" />
              <span>Usage Limit: {coupon.usageLimit}</span>
            </p>
            <p className="flex items-center gap-2">
              <Inventory2Icon color="primary" />
              <span>Usage Count: {coupon.usageCount}</span>
            </p>
            <p className="flex items-center gap-2">
              <CalendarTodayIcon color="primary" />
              <span>
                Expire Date:{" "}
                {dayjs(coupon.expireDate).format("YYYY-MM-DD HH:mm")}
              </span>
            </p>
            <p className="flex items-center gap-2">
              {coupon.isActive ? (
                <>
                  <CheckCircleIcon color="success" />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <CancelIcon color="error" />
                  <span>Inactive</span>
                </>
              )}
            </p>
          </div>

          <div className="border-t mt-4 pt-2 space-y-1">
            <h2 className="font-semibold">Applied Products</h2>
            <ul className="list-disc pl-5 text-gray-700 text-xs sm:text-sm">
              {coupon.productIds.map((product) => (
                <li key={product._id}>{product.title}</li>
              ))}
            </ul>
          </div>

          <div className="text-[11px] sm:text-xs text-gray-500 mt-2 border-t pt-2 space-y-1">
            <p>Created: {dayjs(coupon.createdAt).format("YYYY-MM-DD HH:mm")}</p>
            <p>Updated: {dayjs(coupon.updatedAt).format("YYYY-MM-DD HH:mm")}</p>
            <p>ID: {coupon._id}</p>
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
};

export default CouponDetailPage;
