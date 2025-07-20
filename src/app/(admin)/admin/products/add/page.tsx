"use client";
import { useGetCategories } from "@/hooks/useCategories";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAddProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductForm, { ProductData } from "@/components/ProductForm";
import { AxiosError } from "axios";
import { Category } from "@/types/category";

function AddProductPage() {
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
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    try {
      const { message } = await mutateAsync({
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        offPrice: Number(formData.offPrice),
        countInStock: Number(formData.countInStock),
        tags,
        category: selectedCategory._id,
      });
      router.push("/admin/products");
      toast.success(message);
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
        isPending={isPending}
        productData={formData}
        productDataOnChange={handlerChange}
      />
    </div>
  );
}

export default AddProductPage;


// "use client";

// import { useState } from "react";
// import { useAddProduct } from "@/hooks/useProducts";
// import { useGetCategories } from "@/hooks/useCategories";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import ProductForm from "@/components/ProductForm";

// function AddProductPage() {
//   const router = useRouter();
//   const { mutateAsync, isPending } = useAddProduct();
//   const { data } = useGetCategories();
//   const { categories } = data || {};

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     slug: "",
//     brand: "",
//     price: "",
//     discount: "",
//     offPrice: "",
//     countInStock: "",
//     imageLink: "",
//   });

//   const [tags, setTags] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [coverImageFile, setCoverImageFile] = useState(null);
//   const [coverImageUrl, setCoverImageUrl] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { message } = await mutateAsync({
//         ...formData,
//         tags,
//         category: selectedCategory._id,
//         coverImage: coverImageFile, // اگر فایل رو می‌فرستی جداگانه یا تو FormData، با backend هماهنگ کن
//       });
//       toast.success(message);
//       router.push("/admin/products");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handlerChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="w-full max-w-sm">
//       <h1 className="mb-4 font-bold text-xl">Add Product</h1>
//       <ProductForm
//         onSubmit={handleSubmit}
//         categories={categories}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//         tags={tags}
//         setTags={setTags}
//         productData={formData}
//         productDataOnChange={handlerChange}
//         isPending={isPending}
//         coverImageUrl={coverImageUrl}
//         setCoverImageUrl={setCoverImageUrl}
//         setCoverImageFile={setCoverImageFile}
//       />
//     </div>
//   );
// }

// export default AddProductPage;
