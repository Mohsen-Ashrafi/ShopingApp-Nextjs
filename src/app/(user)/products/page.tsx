import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import ProductsHeader from "./ProductsHeader";
import queryString from "query-string";
import Link from "next/link";
import LikeProduct from "./[slug]/LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import { GetCategoriesResponse } from "@/types/category";
import { GetProductsResponse } from "@/types/product";
import Footer from "@/components/Footer";
import Image from "next/image";

export const dynamic = "force-dynamic"; // eq to {cache:"no-store"} or SSR in pages Dir. :)

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function Products({ searchParams }: ProductsPageProps) {
  const cookieStore = await cookies();
  const strCookies = toStringCookies(cookieStore);
  const searchParam = await searchParams;
  const productsPromise: Promise<GetProductsResponse> = getProducts(
    queryString.stringify(searchParam),
    strCookies
  );
  const categoryPromise: Promise<GetCategoriesResponse> = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ProductsHeader categories={categories} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => {
          const imageUrl =
            product.imageLinks && product.imageLinks.length > 0
              ? `${baseUrl}${product.imageLinks[0]}`
              : "";

          return (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="relative bg-gray-200 rounded-lg p-3 shadow-2xl hover:shadow-[0_4px_30px_rgba(59,130,246,0.7)]
              transition-shadow duration-300 flex flex-col text-sm"
            >
              <div className="absolute right-0 top-0 z-10">
                <LikeProduct product={product} />
              </div>

              {imageUrl && (
                <div className="relative w-full h-36 sm:h-40 mb-3 overflow-hidden rounded">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {typeof product.discount === "number" &&
                    product.discount > 0 && (
                      <span className="absolute top-2 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                </div>
              )}

              <h3 className="font-semibold mb-1 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-1 line-clamp-1">
                {product.description}
              </p>
              {product.offPrice && product.offPrice < product.price ? (
                <div className="flex items-center gap-2 mb-2">
                  <span className="line-through text-gray-500 text-sm">
                    ${product.price}
                  </span>
                  <span className="text-red-500 font-bold">
                    ${product.offPrice}
                  </span>
                </div>
              ) : (
                <p className="font-bold text-blue-600 mb-2">${product.price}</p>
              )}
            </Link>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Products;
