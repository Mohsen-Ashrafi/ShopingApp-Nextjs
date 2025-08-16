import Loading from "@/common/Loading";
import Button from "@/components/Button";
import { createPayment } from "@/services/paymentService";
import { PayDetail } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
  payDetail: PayDetail;
}

function CartSummary({ payDetail }: Props) {
  const { totalGrossPrice, totalOffAmount, totalPrice } = payDetail;
  const { isPending, mutateAsync } = useMutation({ mutationFn: createPayment });
  const QueryClient = useQueryClient();

  const createPaymentHander = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      QueryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError?.response?.data) {
        toast.error(axiosError.response.data.message || "An error occurred");
      }
    }
  };

  return (
    <div
      className="rounded-xl p-4 bg-gray-200 flex flex-col gap-y-4 shadow-2xl hover:shadow-[0_4px_30px_rgba(59,130,246,0.7)]
      transition-shadow duration-300"
    >
      <h2 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-300 pb-2">
        Payment Summary
      </h2>

      <div className="flex justify-between text-gray-700 text-sm sm:text-base">
        <span>Total Price:</span>
        <span className="font-bold">${totalGrossPrice}</span>
      </div>

      <div className="flex justify-between text-gray-700 text-sm sm:text-base">
        <span>Discount:</span>
        <span className="font-bold text-rose-600">${totalOffAmount}</span>
      </div>

      <div className="flex justify-between text-gray-800 border-t border-gray-300 pt-2 font-bold text-sm sm:text-base">
        <span>Final Amount:</span>
        <span className="text-primary-900">${totalPrice}</span>
      </div>

      <div>
        {isPending ? (
          <Loading />
        ) : (
          <Button onClick={createPaymentHander}>Place Order</Button>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
