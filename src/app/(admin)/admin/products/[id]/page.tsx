"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetProductById } from "@/hooks/useProducts";
import Loading from "@/common/Loading";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DiscountIcon from "@mui/icons-material/Discount";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";
import React from "react";
import { GetOneProductResponse } from "@/types/product";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id as string);
  const product = (data as GetOneProductResponse | undefined)?.product;
  const router = useRouter();

  if (isLoading) return <Loading />;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 gap-4">
        <div className="flex-1 space-y-2 text-sm sm:text-base">
          <h1 className="text-lg sm:text-2xl font-bold">{product.title}</h1>

          <p className="text-gray-600 text-sm sm:text-base">
            {product.brand} /
            {typeof product.category === "string"
              ? product.category
              : product.category?.title}
          </p>

          <div className="border-t mt-2 pt-2 space-y-1 text-sm sm:text-base">
            <p className="flex items-center gap-2">
              <AttachMoneyIcon fontSize="small" color="primary" />
              <span>Price: ${product.price}</span>
            </p>
            <p className="flex items-center gap-2">
              <DiscountIcon fontSize="small" color="primary" />
              <span>Discount: {product.discount}%</span>
            </p>
            <p className="flex items-center gap-2">
              <AttachMoneyIcon fontSize="small" color="primary" />
              <span>Discounted Price: ${product.offPrice}</span>
            </p>
            <p className="flex items-center gap-2">
              <Inventory2Icon fontSize="small" color="primary" />
              <span>In Stock: {product.countInStock}</span>
            </p>
            <p className="flex items-center gap-2">
              <StarIcon fontSize="small" color="primary" />
              <span>Rating: {product.rating} / 5</span>
            </p>
            <p className="flex items-center gap-2">
              <span>Reviews: {product.numReviews}</span>
            </p>
          </div>

          <p className="mt-4 text-gray-700 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="text-xs sm:text-sm text-gray-500 mt-2 border-t pt-2 space-y-1">
            <p>Slug: {product.slug}</p>
            <p>
              Created: {dayjs(product.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              Updated: {dayjs(product.updatedAt).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon fontSize="small" />}
              onClick={() => router.back()}
              className="text-sm sm:text-base"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
