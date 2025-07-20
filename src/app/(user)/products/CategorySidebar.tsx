import { Category } from "@/types/category";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

interface CategorySidebarProps {
  categories: Category[];
}

function CategorySidebar({ categories }: CategorySidebarProps) {
  return (
    <div className="col-span-1">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}

export default CategorySidebar;
