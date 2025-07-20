"use client";
import Loading from "@/common/Loading";
import Button from "@/components/Button";
import GoToCartLink from "@/components/MuiLink";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { User } from "@/types/authTypes";
import { Product } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AddToCartProps {
  product: Product;
}

function AddToCart({ product }: AddToCartProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetUser();
  const { isPending, mutateAsync } = useAddToCart();
  const { user } = data || {};

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("Please log in first.");
      router.push("/auth");
      return;
    }

    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError?.response?.data) {
        toast.error(axiosError?.response?.data?.message || "An error occurred");
      }
    }
  };

  const isInCart = (user: User | undefined, product: Product): boolean => {
    if (!user) return false;
    return (
      user.cart?.products.some((p) => p.productId === product._id) ?? false
    );
  };

  return (
    <div>
      {isInCart(user, product) ? (
        <Link href="/cart">
          <GoToCartLink>View Cart</GoToCartLink>
        </Link>
      ) : isPending ? (
        <Loading />
      ) : (
        <Button onClick={addToCartHandler} type="submit" className="w-full">
          Add to Cart
        </Button>
      )}
    </div>
  );
}

export default AddToCart;
