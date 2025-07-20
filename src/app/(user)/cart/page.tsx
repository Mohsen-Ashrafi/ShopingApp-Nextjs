"use client";
import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartPage() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading) return <Loading />;

  if (!user || !data)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:max-w-screen-lg">
        <p className=" text-gray-700 font-bold mb-4">
          Please log in to view your shopping cart.
        </p>
        <Link
          href="/auth"
          className="text-lg font-bold text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Go to Login?
        </Link>
      </div>
    );

  if (!user?.cart?.products || user.cart.products.length === 0)
    return (
      <div>
        <p>The shopping cart is empty!</p>
        <Link
          href="/products"
          className="text-lg font-bold text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Go to the products page?
        </Link>
      </div>
    );
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 gap-4`}>
      <div className="md:col-span-4 spance-y-5">
        {cart &&
          cart.productDetail.map((item) => {
            return <CartItem key={item._id} cartItem={item} />;
          })}
      </div>
      <div className="md:col-span-2">
        {cart?.payDetail && <CartSummary payDetail={cart.payDetail} />}
      </div>
    </div>
  );
}

export default CartPage;
