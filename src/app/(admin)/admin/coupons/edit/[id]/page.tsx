"use client";
import Loading from "@/common/Loading";
import CouponForm from "@/components/CouponForm";
import { useGetOneCoupon, useUpdateCoupon } from "@/hooks/useCoupons";
import { useGetProducts } from "@/hooks/useProducts";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, JSX, useEffect, useState } from "react";
import { CouponType, FormData, ProductOption } from "@/types/coupon";
import toast from "react-hot-toast";
import DateObject from "react-date-object";
import { MultiValue } from "react-select";

function UpdateCouponPage(): JSX.Element {
  const { id } = useParams();
  const { isLoading, data } = useGetOneCoupon(id as string);
  const { coupon } = data || {};
  const { data: productsData } = useGetProducts("", "");
  const { products } = productsData || {};
  const [formData, setFormData] = useState<FormData>({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const [type, setType] = useState<CouponType>("percent");
  const [productIds, setProductIds] = useState<MultiValue<ProductOption>>([]);
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const { isPending, mutateAsync } = useUpdateCoupon();
  const router = useRouter();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: coupon?._id || "",
        data: {
          ...formData,
          amount: Number(formData.amount),
          usageLimit: Number(formData.usageLimit),
          type,
          expireDate: expireDate?.toISOString() || "",
          productIds: (productIds as ProductOption[]).map((p) => p._id),
        },
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (coupon) {
      setType(coupon.type);
      setProductIds(coupon.productIds);
      setFormData({
        code: coupon.code,
        amount: coupon.amount.toString(),
        usageLimit: coupon.usageLimit.toString(),
      });
      setExpireDate(new Date(coupon.expireDate));
      setType(coupon.type);
      setProductIds(coupon.productIds);
    }
  }, [coupon]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 font-bold sm:text-xl text-base">Add Coupon Code</h1>
      <CouponForm
        expireDate={expireDate ? new DateObject(expireDate) : new DateObject()}
        setExpireDate={(d) => setExpireDate(d?.toDate() || null)}
        type={type}
        setType={setType}
        formData={formData}
        isPending={isPending}
        onChangeSelect={setProductIds}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        options={products || []}
        defaultValue={coupon?.productIds || []}
      />
    </div>
  );
}

export default UpdateCouponPage;
