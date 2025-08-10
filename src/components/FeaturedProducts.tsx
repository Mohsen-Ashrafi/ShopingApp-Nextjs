"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  imageLink?: string;
  offPrice?: number;
  discount?: number;
}

interface Props {
  latest: Product[];
}

function FeaturedProducts({ latest }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 2 : 4;

  const slides: Product[][] = [];
  for (let i = 0; i < latest.length; i += itemsPerSlide) {
    slides.push(latest.slice(i, i + itemsPerSlide));
  }

  useEffect(() => {
    if (!isMobile) {
      setCurrentSlide(Math.max(0, Math.floor(slides.length / 2)));
    } else {
      setCurrentSlide(0);
    }
  }, [slides.length, isMobile]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="sm:text-2xl text-xl font-bold mb-6 text-center">
        🔥 Featured Products
      </h2>

      <div className="relative overflow-hidden w-screen left-[49%] right-[51%] -mx-[50vw]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: isMobile
              ? `translateX(-${currentSlide * 100}%)`
              : `translateX(calc(-${currentSlide * 85}% + 7.5%))`,
          }}
        >
          {slides.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`grid gap-4 sm:gap-6 flex-shrink-0 ${
                isMobile ? "grid-cols-2 px-4" : "sm:grid-cols-4 px-4"
              }`}
              style={{
                width: isMobile ? "100%" : "85%",
              }}
            >
              {group.map((product) => {
                const imageUrl = product.imageLink
                  ? `${baseUrl}${product.imageLink}`
                  : "";

                return (
                  <div
                    key={product._id}
                    className="bg-gray-200 rounded-lg p-3 shadow-2xl hover:shadow-[0_4px_30px_rgba(59,130,246,0.7)] 
                  transition-shadow duration-300 flex flex-col text-sm"
                  >
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
                      <p className="font-bold text-blue-600 mb-2">
                        ${product.price}
                      </p>
                    )}
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-blue-500 hover:underline text-xs mt-auto"
                    >
                      View Product
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;

// pagination ro doros k0m(yekam overflow khorde)
