"use client";
import Link from "next/link";
import ProductListTable from "./products/ProductListTable";
import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategories";
import CategoryListTable from "./categories/CategoryListTable";
import { useGetPayments } from "@/hooks/usePayments";
import PaymentListTable from "./payments/PaymentListTable";
import { useGetCoupons } from "@/hooks/useCoupons";
import CouponListTable from "./coupons/CouponListTable";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./users/UsersTable";
import ResponsiveAdminHeader from "./ResponsiveAdminHeader";

function AdminDashboard() {
  const { data, isLoading } = useGetProducts("", "");
  const products = data?.products ?? [];

  const { data: usersData } = useGetUsers();
  const users = usersData?.users ?? [];

  const { data: categoriesData } = useGetCategories();
  const categories = categoriesData?.categories ?? [];

  const { data: paymentsData } = useGetPayments();
  const payments = paymentsData?.payments ?? [];

  const { data: couponsData } = useGetCoupons();
  const coupons = couponsData?.coupons ?? [];

  if (isLoading) return <Loading />;

  return (
    <div className="px-2 sm:px-4">
      <ResponsiveAdminHeader title="Admin Dashboard" />
      {/* Users */}
      <div className="p-2 sm:p-4 mt-4 sm:mt-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2">
          <h1 className="text-lg sm:text-xl font-bold">Users Information</h1>
          <Link
            href="/admin/users"
            className="text-blue-600 hover:underline text-sm"
          >
            View all Users
          </Link>
        </div>
        <UsersTable
          users={users
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3)}
        />
      </div>
      {/* Products */}
      <div className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-bold">Products</h2>
          <Link
            href="/admin/products"
            className="text-blue-600 hover:underline text-sm"
          >
            View all Products
          </Link>
        </div>
        <ProductListTable
          products={products
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3)}
        />
      </div>
      {/* Categories */}
      <div className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h1 className="text-lg sm:text-xl font-bold">Categories</h1>
          <Link
            href="/admin/categories"
            className="text-blue-600 hover:underline text-sm"
          >
            View all Categories
          </Link>
        </div>
        <CategoryListTable
          categories={categories
            .sort(
              (a, b) =>
                new Date(b.createdAt ?? 0).getTime() -
                new Date(a.createdAt ?? 0).getTime()
            )
            .slice(0, 3)}
        />
      </div>
      {/* Payments */}
      <div className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg sm:text-xl font-bold">Payments</h1>
          <Link
            href="/admin/payments"
            className="text-blue-600 hover:underline text-sm sm:mr-3"
          >
            View all Payments
          </Link>
        </div>
        <PaymentListTable
          payments={payments
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3)}
        />
      </div>
      {/* Coupons */}
      <div className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h1 className="text-lg sm:text-xl font-bold">Coupons</h1>
          <Link
            href="/admin/coupons"
            className="text-blue-600 hover:underline text-sm sm:mr-3"
          >
            View all Coupons
          </Link>
        </div>
        <CouponListTable
          coupons={coupons
            .sort(
              (a, b) =>
                new Date(b.createdAt ?? 0).getTime() -
                new Date(a.createdAt ?? 0).getTime()
            )
            .slice(0, 3)}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
