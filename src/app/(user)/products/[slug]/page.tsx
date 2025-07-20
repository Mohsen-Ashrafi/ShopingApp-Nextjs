import { getOneProductBySlug, getProducts } from "@/services/productService";
import AddToCart from "./AddToCart";
import { Product } from "@/types/product";

export const dynamic = "force-static"; // SSG or {cache : "force-cache"}
export const dynamicParams = false;

interface ProductPageProps {
  params: { slug: string };
}

async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const { product }: { product: Product } = await getOneProductBySlug(slug);

  return (
    <div className="max-w-lg w-full mx-auto bg-white p-4 md:p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 leading-snug">
        {product.title}
      </h1>

      <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
        {product.description}
      </p>

      <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
        Original Price:
        <span
          className={`ml-1 ${
            product.discount
              ? "line-through text-gray-400"
              : "font-bold text-primary-800"
          }`}
        >
          ${product.price}
        </span>
      </p>

      {!!product.discount && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-3 mb-4 md:mb-6">
          <p className="text-base md:text-lg font-semibold text-green-700">
            Discounted Price: ${product.offPrice}
          </p>
          <div className="bg-rose-500 px-3 py-1 rounded-xl text-white text-xs font-semibold w-fit">
            {product.discount}%
          </div>
        </div>
      )}

      <div className="mt-4">
        <AddToCart product={product} />
      </div>
    </div>
  );
}
export default ProductPage;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { products } = await getProducts("", "");

  return products.map((product) => ({
    slug: product.slug,
  }));
}
