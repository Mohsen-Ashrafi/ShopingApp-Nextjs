"use client";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/common/Loading";
import { useGetCategoryById } from "@/hooks/useCategories";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import LabelIcon from "@mui/icons-material/Label";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import React from "react";
import { CategoryResponse } from "@/types/category";

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id as string);
  const router = useRouter();
  const category = (data as CategoryResponse)?.category;

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 gap-4">
        <div className="flex-1 space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold">{category.title}</h1>

          <div className="border-t mt-2 pt-2 space-y-2">
            <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <InfoIcon fontSize="small" color="primary" />
              <span className="font-semibold">Description:</span>{" "}
              {category.description}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <LabelIcon fontSize="small" color="primary" />
              <span className="font-semibold">Title:</span>{" "}
              {category.englishTitle}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <CategoryIcon fontSize="small" color="primary" />
              <span className="font-semibold">Type:</span> {category.type}
            </p>
          </div>

          <div className="text-[11px] sm:text-xs text-gray-500 mt-2 border-t pt-2">
            <span className="font-semibold">Updated:</span>{" "}
            {dayjs(category.updatedAt).format("YYYY-MM-DD HH:mm")}
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              className="text-xs sm:text-sm"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
