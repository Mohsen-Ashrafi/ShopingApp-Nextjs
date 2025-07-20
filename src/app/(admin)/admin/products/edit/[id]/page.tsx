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
  const categories = useMemo<Category[]>(() => {
    return categoryData?.categories || [];
  }, [categoryData]);
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
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { isPending, mutateAsync } = useUpdateProduct();

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory || !product) {
      toast.error("Please select a category");
      return;
    }

    try {
      const { message } = await mutateAsync({
        productId: product._id,
        data: {
          ...formData,
          price: Number(formData.price),
          discount: Number(formData.discount),
          offPrice: Number(formData.offPrice),
          countInStock: Number(formData.countInStock),
          tags,
          category: selectedCategory._id,
        },
      });
      router.push("/admin/products");
      toast.success(message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (!product || categories.length === 0) return;

    setTags(product.tags || []);

    const categoryObj = categories.find(
      (c) =>
        c._id ===
        (typeof product.category === "string"
          ? product.category
          : product.category._id)
    );
    setSelectedCategory(categoryObj || null);

    setFormData({
      title: product.title || "",
      description: product.description || "",
      slug: product.slug || "",
      brand: product.brand || "",
      price: product.price || 0,
      discount: product.discount || 0,
      offPrice: product.offPrice || 0,
      countInStock: product.countInStock || 0,
      imageLink: product.imageLink || "",
    });
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
      />
    </div>
  );
}

export default UpdateProductPage;
