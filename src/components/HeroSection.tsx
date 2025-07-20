import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to Next Shop</h1>
        <p className="text-lg mb-6">
          Find your favorite products with best prices
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};
export default HeroSection;
