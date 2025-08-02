"use client";

import Loading from "@/common/Loading";
import CategoryForm, {
  CategoryType,
  categoryTypes,
} from "@/components/CategoryForm";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories";
import { Category, CategoryFormData } from "@/types/category";
import { includeObj } from "@/utils/objectUtils";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const includesCategoryKey: (keyof Category)[] = [
  "title",
  "englishTitle",
  "description",
];

function UpdateCategoryPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id as string);
  const { category } = data || {};
  const [formData, setFormData] = useState<CategoryFormData>({});
  const [selectedType, setSelectedType] = useState<CategoryType | null>(null);
  const { isPending, mutateAsync } = useUpdateCategory();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setSelectedType(
        categoryTypes.find((c) => c.value === category.type) || null
      );
      setFormData(includeObj(category, includesCategoryKey));
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!category?._id) {
      toast.error("Category id is missing");
      return;
    }
    if (!selectedType) {
      toast.error("Please select a category type");
      return;
    }

    try {
      const { message } = await mutateAsync({
        data: {
          ...formData,
          type: selectedType.value,
        },
        id: category._id,
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  if (isLoading || !category) return <Loading />;

  return (
    <div>
      <h1 className="sm:mb-4 m-4 font-bold sm:text-xl text-lg">
        Edit Category
      </h1>
      <CategoryForm
        category={formData}
        handleChange={handleChange}
        isPending={isPending}
        onSubmit={handleSubmit}
        selectedType={categoryTypes.find((c) => c.value === category.type)}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}
export default UpdateCategoryPage;
