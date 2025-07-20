"use client";
import Loading from "@/common/Loading";
import { useGetCoupons } from "@/hooks/useCoupons";
import Button from "@/components/Button";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CouponListTable from "./CouponListTable";
import { Coupon } from "@/types/coupon";
import { JSX } from "react";
import ResponsiveAdminHeader from "../ResponsiveAdminHeader";

function Coupons(): JSX.Element {
  const { data, isLoading } = useGetCoupons();
  const coupons: Coupon[] = data?.coupons || [];

  if (isLoading) return <Loading />;

  return (
    <div className="my-6">
      <div>
        <ResponsiveAdminHeader title="Coupons" />
      </div>

      <div className="flex justify-end">
        <div className="w-49 sm:w-fit">
          <Link href="/admin/coupons/add">
            <Button>
              Add Coupon Code <AddIcon />
            </Button>
          </Link>
        </div>
      </div>

      <CouponListTable coupons={coupons} />
    </div>
  );
}
export default Coupons;
