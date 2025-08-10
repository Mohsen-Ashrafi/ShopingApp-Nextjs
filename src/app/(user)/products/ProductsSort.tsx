"use client";
import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { RadioGroup } from "@mui/material";
interface SortOption {
  id: number;
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  {
    id: 1,
    value: "latest",
    label: "latest",
  },
  {
    id: 2,
    value: "earliest",
    label: "earliest",
  },
  {
    id: 3,
    value: "popular",
    label: "popular",
  },
];

function ProductsSort() {
  const [sort, setSort] = useState<string>("lastest");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value);
    const value = e.target.value;
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  useEffect(() => {
    setSort(searchParams.get("sort") || "latest");
  }, [searchParams]);

  return (
    <div className="flex items-center gap-4">
    <p className="font-bold text-sm md:text-base">Sorting products:</p>
    <RadioGroup row name="product-sort" value={sort} onChange={sortHandler}>
      {sortOptions.map((item) => {
        return (
          <RadioInput
            id={item.id.toString()}
            key={item.id}
            label={item.label}
            name="product-sort"
            value={item.value}
            checked={sort === item.value}
            onChange={sortHandler}
          />
        );
      })}
        </RadioGroup>
    </div>
  );
}

export default ProductsSort;
