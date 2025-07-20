"use client";
import CouponForm from "@/components/CouponForm";
import { useAddNewCoupon } from "@/hooks/useCoupons";
import { useGetProducts } from "@/hooks/useProducts";
import { CouponType, FormData, ProductOption } from "@/types/coupon";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, JSX, useState } from "react";
import toast from "react-hot-toast";
import DateObject from "react-date-object";
import { MultiValue } from "react-select";

function AddCouponPage(): JSX.Element {
  const { data } = useGetProducts("", "");
  const { products } = data || {};
  const [formData, setFormData] = useState<FormData>({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const [type, setType] = useState<CouponType>("percent");
  const [productIds, setProductIds] = useState<MultiValue<ProductOption>>([]);
  const [expireDate, setExpireDate] = useState<DateObject | null>(
    new DateObject()
  );
  const { isPending, mutateAsync } = useAddNewCoupon();
  const router = useRouter();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        code: formData.code,
        amount: Number(formData.amount),
        usageLimit: Number(formData.usageLimit),
        type,
        expireDate: expireDate ? expireDate.toDate().toISOString() : "",
        productIds: productIds.map((p) => p._id),
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 font-bold sm:text-xl text-base">Add Coupon Code</h1>
      <CouponForm
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        type={type}
        setType={setType}
        formData={formData}
        isPending={isPending}
        onChangeSelect={setProductIds}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        options={products || []}
      />
    </div>
  );
}

export default AddCouponPage;
