"use client";
import { likeProduct } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AxiosError } from "axios";
import { Product } from "@/types/product";

interface LikeProductProps {
  product: Pick<Product, "_id" | "isLiked">;
}

function LikeProduct({ product }: LikeProductProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      router.replace(`${pathname}?${searchParams.toString()}`);
      router.refresh();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="my-2">
      <IconButton
        onClick={likeHandler}
        sx={{
          color: product.isLiked ? "error.main" : "grey.500",
        }}
      >
        {product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </div>
  );
}

export default LikeProduct;
