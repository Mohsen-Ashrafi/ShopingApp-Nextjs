"use client";

import Loading from "@/common/Loading";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useGetCategories } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import ProductForm, { ProductData } from "@/components/ProductForm";
import { Category } from "@/types/category";
import { AxiosError } from "axios";

function UpdateProductPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id as string);
  const { product } = data || {};
  const { data: categoryData } = useGetCategories();
  const categories = useMemo<Category[]>(
    () => categoryData?.categories || [],
    [categoryData]
  );
  const router = useRouter();
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
  const { mutateAsync, isPending } = useUpdateProduct();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory || !product) {
      toast.error("Please select a category");
      return;
    }

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      formDataToSend.append("tags", JSON.stringify(tags));
      formDataToSend.append("category", selectedCategory._id);

      if (coverImageFile) {
        formDataToSend.append("image", coverImageFile);
      }

      const { message } = await mutateAsync({
        productId: product._id,
        data: formDataToSend,
      });

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

  useEffect(() => {
    if (!product || categories.length === 0) return;

    let parsedTags: string[] = [];

    try {
      if (Array.isArray(product.tags)) {
        const first = product.tags[0];
        if (typeof first === "string") {
          const parsed = JSON.parse(first);
          parsedTags = Array.isArray(parsed) ? parsed : [];
        } else {
          parsedTags = product.tags;
        }
      } else if (typeof product.tags === "string") {
        parsedTags = JSON.parse(product.tags);
      }
    } catch (error) {
      console.error("Error parsing tags:", error);
      parsedTags = [];
    }

    setTags(parsedTags);

    setFormData({
      title: product.title ?? "",
      description: product.description ?? "",
      slug: product.slug ?? "",
      brand: product.brand ?? "",
      price: String(product.price ?? ""),
      discount: String(product.discount ?? ""),
      offPrice: String(product.offPrice ?? ""),
      countInStock: String(product.countInStock ?? ""),
      imageLink: product.imageLink ?? "",
    });

    const categoryObj = categories.find((c) =>
      typeof product.category === "string"
        ? c._id === product.category
        : c._id === product.category._id
    );
    setSelectedCategory(categoryObj || null);

    if (product.imageLink) {
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${
        product.imageLink
      }`;
      setCoverImageUrl(fullUrl);
    }
  }, [product, categories]);

  if (isLoading || !product) return <Loading />;

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 font-bold text-xl">Edit Product</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        tags={tags}
        setTags={setTags}
        isPending={isPending}
        productData={formData}
        productDataOnChange={handlerChange}
        coverImageUrl={coverImageUrl}
        setCoverImageUrl={setCoverImageUrl}
        setCoverImageFile={setCoverImageFile}
      />
    </div>
  );
}

export default UpdateProductPage;
