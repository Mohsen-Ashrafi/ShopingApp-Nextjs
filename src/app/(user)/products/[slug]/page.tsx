import Image from "next/image";
import { getOneProductBySlug, getProducts } from "@/services/productService";
import AddToCart from "./AddToCart";
import { Product } from "@/types/product";
import Footer from "@/components/Footer";

// export const dynamic = "force-dynamic";
export const dynamic = "force-static"; // SSG or {cache : "force-cache"}
export const dynamicParams = false;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const { product }: { product: Product } = await getOneProductBySlug(slug);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";
  const imageUrl = product?.imageLink ? `${baseUrl}${product.imageLink}` : "";

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-[300px] md:h-[450px] bg-white rounded-xl overflow-hidden shadow-md">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />
        </div>

        <div className="flex flex-col justify-start space-y-4">
          <h1 className="text-lg md:text-xl font-extrabold text-gray-900">
            {product.title}
          </h1>

          <p className="text-gray-600 text-base">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>

          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <p className="text-sm text-gray-500">
              {JSON.parse(product.tags[0])?.join(" / ")}
            </p>
          )}

          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4">
            {product.offPrice && product.offPrice < product.price ? (
              <div className="flex items-center gap-3">
                <span className="line-through text-gray-400 text-lg sm:text-xl">
                  {product.price} $
                </span>
                <span className="text-gray-700 text-lg sm:text-xl font-bold">
                  {product.offPrice} $
                </span>
                {product.discount && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            ) : (
              <span className="text-primary-800 text-lg sm:text-xl font-semibold">
                ${product.price}
              </span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
            <p className="text-green-500 my-3">Free shipping & delivery</p>
            <div className="sm:col-span-2">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-6 md:px-10 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
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
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return [];
  }
  // fixing error
  try {
    const { products } = await getProducts("", "");
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// /cart image ezafe she-2ta soton she morabayi shekl  she to in safe./arm paypal va ... zade she
//  view cart bere kenare gheymat
// age mitoni relatedpost bezar to detailProduct
// bara site logo bezar
// darkmode ezafe she
