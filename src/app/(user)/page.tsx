"use client";
import Loading from "@/common/Loading";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import HeroSection from "@/components/HeroSection";
import { useGetProducts } from "@/hooks/useProducts";

export default function Home() {
  const { data, isLoading, isError } = useGetProducts("", "");
  const products = data?.products ?? [];
  const latest = products.slice(0, 12);

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <main>
      <HeroSection />
      <FeaturedProducts latest={latest} />
      <HeroBanner />
      <Footer />
    </main>
  );
}
