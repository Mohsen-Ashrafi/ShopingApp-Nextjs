import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import Link from "next/link";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./[slug]/LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import { GetCategoriesResponse } from "@/types/category";
import { GetProductsResponse } from "@/types/product";

export const dynamic = "force-dynamic"; // eq to {cache:"no-store"} or SSR in pages Dir. :)

interface ProductsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

async function Products({ searchParams }: ProductsPageProps) {
  const cookieStore = await cookies();
  const strCookies = toStringCookies(cookieStore);
  const productsPromise: Promise<GetProductsResponse> = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
  const categoryPromise: Promise<GetCategoriesResponse> = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl md:text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-start">
        <div className="col-span-1">
          <CategorySidebar categories={categories} />
        </div>
        <div className="col-span-2 md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-xl shadow-lg p-4 bg-white"
              >
                <h2 className="font-bold text-lg md:text-xl mb-4">
                  {product.title}
                </h2>

                <div className="mb-4 text-sm md:text-base">
                  <span>Created at: </span>
                  <span className="font-semibold">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <Link
                  className="text-blue-500 hover:text-blue-600 font-semibold text-sm transition-all duration-300
                  border-b-2 border-transparent hover:border-blue-600 pb-[1px]"
                  href={`/products/${product.slug}`}
                >
                  View product
                </Link>

                <div className="mt-1 flex flex-col gap-2">
                  <LikeProduct product={product} />
                  <AddToCart product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
