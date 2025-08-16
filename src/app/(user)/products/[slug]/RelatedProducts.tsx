"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;
  const displayedProducts = products.slice(0, 4);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {displayedProducts.map((product) => {
          const imageUrl = product.imageLink
            ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${
                product.imageLink
              }`
            : "";

          return (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="relative bg-gray-200 rounded-lg p-2 shadow-lg hover:shadow-[0_4px_20px_rgba(59,130,246,0.5)]
              transition-shadow duration-300 flex flex-col text-xs"
            >
              {imageUrl && (
                <div className="relative w-full h-28 sm:h-32 mb-2 overflow-hidden rounded">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  {typeof product.discount === "number" &&
                    product.discount > 0 && (
                      <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1 py-[2px] rounded">
                        -{product.discount}%
                      </span>
                    )}
                </div>
              )}

              <h3 className="font-semibold mb-1 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-1 line-clamp-1 text-[10px]">
                {product.description}
              </p>

              {product.offPrice && product.offPrice < product.price ? (
                <div className="flex items-center gap-1 mb-1">
                  <span className="line-through text-gray-500 text-[10px]">
                    ${product.price}
                  </span>
                  <span className="text-red-500 font-bold text-[11px]">
                    ${product.offPrice}
                  </span>
                </div>
              ) : (
                <p className="font-bold text-blue-600 mb-1 text-[11px]">
                  ${product.price}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
