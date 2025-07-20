import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 sm:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-white text-2xl font-bold mb-2">NextShop</h2>
          <p className="text-sm leading-relaxed">
            Discover the best curated products with premium quality and fast
            delivery.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NextShop. All rights reserved.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white">
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm">mohsenashrafi238@gmail.com</p>
          <p className="text-sm mt-1">+49 174 864 1102</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
