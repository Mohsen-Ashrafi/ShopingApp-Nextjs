"use client";
import Loading from "@/common/Loading";
import Link from "next/link";
import Button from "@/components/Button";
import AddIcon from "@mui/icons-material/Add";
import { useGetCategories } from "@/hooks/useCategories";
import CategoryListTable from "./CategoryListTable";
import { Category } from "@/types/category";
import { JSX } from "react";
import ResponsiveAdminHeader from "../ResponsiveAdminHeader";

function Categories(): JSX.Element {
  const { data, isLoading } = useGetCategories();
  const categories: Category[] = data?.categories || [];

  if (isLoading) return <Loading />;

  return (
    <div className="my-6">
      <div>
        <ResponsiveAdminHeader title="Categories" />
      </div>

      <div className="flex justify-end">
        <div className="w-41 sm:w-fit mb-4">
          <Link href="/admin/categories/add">
            <Button>
              Add Category <AddIcon />
            </Button>
          </Link>
        </div>
      </div>

      <CategoryListTable categories={categories} />
    </div>
  );
}

export default Categories;
