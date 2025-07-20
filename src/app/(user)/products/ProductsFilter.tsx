"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import CheckBox from "@/common/CheckBox";
import { Category } from "@/types/category";

interface ProductsFilterProps {
  categories: Category[];
}

function ProductsFilter({ categories }: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") || []
  );

  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams);
      const val = Array.isArray(value) ? value.join(",") : value;
      params.set(name, val);
      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(categories);
      router.push(pathname + "?" + createQueryString("category", categories));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
  };

  return (
    <div>
      <p className="font-bold sm:mb-4 mb-2">Categories</p>
      <ul className="sm:space-y-2 space-y-1">
        {categories.map((category) => {
          return (
            <CheckBox
              key={category._id}
              id={category._id}
              value={category.englishTitle}
              name="product-type"
              label={category.title}
              onChange={categoryHandler}
              checked={selectedCategories.includes(category.englishTitle)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductsFilter;
