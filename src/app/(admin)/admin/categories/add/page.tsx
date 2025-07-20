"use client";
import CategoryForm, { categoryTypes } from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useCategories";
import { CategoryFormValues } from "@/types/category";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

function AddCategoryPage() {
  const [category, setCategory] = useState<CategoryFormValues>({
    title: "",
    description: "",
    englishTitle: "",
  });
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<
    (typeof categoryTypes)[number] | null
  >(null);
  const { isPending, mutateAsync } = useAddCategory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...category,
        type: selectedType?.value || "",
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="w-full max-w-sm">
      <h1 className="sm:mb-4 m-4 font-bold sm:text-xl text-lg">
        Add New Category
      </h1>
      <CategoryForm
        category={category}
        handleChange={handleChange}
        isPending={isPending}
        onSubmit={handleSubmit}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}

export default AddCategoryPage;
