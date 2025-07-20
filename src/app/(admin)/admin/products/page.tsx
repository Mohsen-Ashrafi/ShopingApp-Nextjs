"use client";

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductListTable from "./ProductListTable";
import Link from "next/link";
import Button from "@/components/Button";
import AddIcon from "@mui/icons-material/Add";
import { JSX } from "react";
import { Product } from "@/types/product";
import ResponsiveAdminHeader from "../ResponsiveAdminHeader";

function Page(): JSX.Element {
  const { data, isLoading } = useGetProducts("", "");
  const products: Product[] = data?.products || [];

  if (isLoading) return <Loading />;

  return (
    <div className="my-6">
      <div>
        <ResponsiveAdminHeader title="Products" />
      </div>

      <div className="flex justify-end">
        <div className="w-40 sm:w-fit mb-4">
          <Link href="/admin/products/add">
            <Button>
              Add Product <AddIcon />
            </Button>
          </Link>
        </div>
      </div>

      <ProductListTable products={products} />
    </div>
  );
}

export default Page;
