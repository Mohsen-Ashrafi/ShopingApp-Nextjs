"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useAddProduct } from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductForm, { ProductData } from "@/components/ProductForm";
import { Category } from "@/types/category";
import { AxiosError } from "axios";

function AddProductPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useAddProduct();
  const { data } = useGetCategories();
  const categories: Category[] = data?.categories || [];
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    discount: "",
    offPrice: "",
    countInStock: "",
    imageLink: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      formDataToSend.append("tags", JSON.stringify(tags));
      formDataToSend.append("category", selectedCategory._id);

      if (coverImageFile) {
        formDataToSend.append("image", coverImageFile);
      }

      const { message } = await mutateAsync(formDataToSend);
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 font-bold text-xl">Add Product</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        tags={tags}
        setTags={setTags}
        productData={formData}
        productDataOnChange={handlerChange}
        isPending={isPending}
        coverImageUrl={coverImageUrl}
        setCoverImageUrl={setCoverImageUrl}
        setCoverImageFile={setCoverImageFile}
      />
    </div>
  );
}

export default AddProductPage;
