import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroBanner: React.FC = () => {
  return (
    <section className="w-full h-[400px] relative">
      <Image
        src="https://i.postimg.cc/8Cvsd1qz/katoni9.jpg"
        alt="Online shopping banner"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
        <div className="text-white space-y-5 max-w-2xl px-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Discover the Best Deals on Premium Products
          </h1>
          <p className="text-lg sm:text-xl">
            Shop your favorite items with exclusive discounts and fast delivery.
            Start exploring now!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link
              href="/products"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Start Shopping
            </Link>
            <Link
              href="/profile"
              className="border border-white px-6 py-3 rounded-full text-white hover:bg-white hover:text-black transition"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
