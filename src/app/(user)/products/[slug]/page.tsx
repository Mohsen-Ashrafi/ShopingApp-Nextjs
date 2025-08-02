import Image from "next/image";
import { getOneProductBySlug, getProducts } from "@/services/productService";
import AddToCart from "./AddToCart";
import { Product } from "@/types/product";
import Footer from "@/components/Footer";

export const dynamic = "force-static"; // SSG or {cache : "force-cache"}
export const dynamicParams = false;

interface ProductPageProps {
  // params: { slug: string };
  params: Promise<{ slug: string }>;
}

async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { product }: { product: Product } = await getOneProductBySlug(slug);
  // const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";
  // const imageUrl = `${baseUrl}${product.imageLink}`;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";
  const imageUrl = product?.imageLink ? `${baseUrl}${product.imageLink}` : "";

  return (
    <div className="bg-gray-50 min-h-screen p-2">
      <p className="text-gray-600 text-base mx-4">
        {Array.isArray(product.tags)
          ? JSON.parse(product.tags[0])?.join(" / ")
          : ""}
      </p>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            {product.title}
          </h1>
          <p className="text-gray-600 text-base my-2">Brand: {product.brand}</p>
          <div className="relative w-full h-[300px] md:h-[400px] bg-white rounded-xl overflow-hidden shadow-md">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            Buy the best with us
          </h2>

          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-2">Original Price:</p>
            <span
              className={`text-lg sm:text-xl font-semibold ${
                product.discount
                  ? "line-through text-gray-400"
                  : "text-primary-800"
              }`}
            >
              ${product.price}
            </span>

            {!!product.discount && (
              <div className="flex items-center gap-3 mt-2">
                <p className="text-green-700 text-lg sm:text-xl font-bold">
                  Discounted: ${product.offPrice}
                </p>
                <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <AddToCart product={product} />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-6 md:px-10 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 text-center">
            Why Shop With Us?
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Enjoy <strong>free shipping</strong> for members spending over $500.
            We offer 4-day standard delivery, 2-day express for groceries,{" "}
            <strong>exclusive support</strong>, and the fastest delivery
            experience in the market. Your satisfaction is our priority. Shop
            with confidence at NextShop.
          </p>
        </div>
      </div>

      <Footer />
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
