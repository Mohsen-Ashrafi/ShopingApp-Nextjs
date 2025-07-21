import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
}

interface Props {
  latest: Product[];
}

export default function FeaturedProducts({ latest }: Props) {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🔥 Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latest.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold mb-2">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2 truncate">{product.description}</p>
            <p className="font-bold text-blue-600 mb-4">${product.price}</p>
            <Link
              href={`/products/${product.slug}`}
              className="text-blue-500 hover:underline text-sm"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
