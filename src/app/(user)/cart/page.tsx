"use client";
import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Image from "next/image";

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
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div className="md:col-span-4 space-y-5">
        {cart &&
          cart.productDetail.map((item) => {
            const baseUrl =
              process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";
            const imageUrl = item.imageLinks?.length
              ? `${baseUrl}${item.imageLinks[0]}`
              : "/placeholder.png";

            return (
              <div
                key={item._id}
                className="flex items-center gap-6 bg-gray-200 shadow-2xl hover:shadow-[0_4px_30px_rgba(59,130,246,0.7)]
                transition-shadow duration-300 min-h-[140px] p-4 rounded-xl"
              >
                <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="112px"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 h-full">
                  <CartItem cartItem={item} />
                </div>
              </div>
            );
          })}
      </div>
      <div className="md:col-span-2 flex flex-col gap-4">
        {cart?.payDetail && <CartSummary payDetail={cart.payDetail} />}

        {/* Payment logos */}
        <div className="flex items-center justify-start gap-4 mt-4">
          <Image
            src="https://i.postimg.cc/59Pr7v0z/paypal-PNG20.png"
            alt="PayPal"
            width={80}
            height={30}
            className="object-contain"
          />
          <Image
            src="https://i.postimg.cc/Fz1T5WRL/visa-logo-png-hd-11661940023fyoo9v0ouo.png"
            alt="Visa"
            width={80}
            height={30}
            className="object-contain"
          />
          <Image
            src="https://i.postimg.cc/Bn2M01qM/mastercard.png"
            alt="Mastercard"
            width={80}
            height={30}
            className="object-contain"
          />
          <Image
            src="https://i.postimg.cc/3NPFM3Vs/american-express.png"
            alt="American Express"
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
