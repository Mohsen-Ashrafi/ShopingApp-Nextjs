"use client";

import Select from "react-select";
import TextField from "@/common/TextField";
import Loading from "@/common/Loading";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";
import CustomTagInput from "./CustomTagInput";
import { Category } from "@/types/category";

export interface ProductData {
  title: string;
  description: string;
  slug: string;
  brand: string;
  price: string | number;
  discount: string | number;
  offPrice: string | number;
  countInStock: string | number;
  imageLink?: string;
}

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  productData: ProductData;
  productDataOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: (option: Category | null) => void;
  isPending: boolean;
  coverImageUrl: string | null;
  setCoverImageUrl: (url: string | null) => void;
  setCoverImageFile: (file: File | null) => void;
}

const productsFormData: {
  id: number;
  label: string;
  name: keyof ProductData;
}[] = [
  { id: 1, label: "Title", name: "title" },
  { id: 2, label: "Description", name: "description" },
  { id: 3, label: "Slug", name: "slug" },
  { id: 4, label: "Brand", name: "brand" },
  { id: 5, label: "Price", name: "price" },
  { id: 6, label: "Discount", name: "discount" },
  { id: 7, label: "Discounted Price", name: "offPrice" },
  { id: 8, label: "Stock", name: "countInStock" },
];

const ProductForm: React.FC<Props> = ({
  tags,
  setTags,
  onSubmit,
  productData,
  productDataOnChange,
  categories,
  selectedCategory,
  setSelectedCategory,
  isPending,
  coverImageUrl,
  setCoverImageUrl,
  setCoverImageFile,
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {productsFormData.map((item) => (
        <TextField
          key={item.id}
          label={item.label}
          name={item.name}
          value={String(productData[item.name] ?? "")}
          onChange={productDataOnChange}
        />
      ))}

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Product Image
        </label>
        <div className="relative flex items-center">
          <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition text-sm">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setCoverImageFile(file);
                  setCoverImageUrl(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </label>
          {coverImageUrl && (
            <span className="ml-3 text-sm text-gray-600">Image selected</span>
          )}
        </div>

        {coverImageUrl && (
          <div className="relative mt-3 w-full h-48 border rounded overflow-hidden">
            <Image
              src={coverImageUrl}
              alt="Preview"
              layout="fill"
              objectFit="cover"
            />
            <IconButton
              size="small"
              onClick={() => {
                setCoverImageFile(null);
                setCoverImageUrl(null);
              }}
              className="!absolute top-1 right-1 bg-white"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="tags" className="block my-2 font-medium">
          Tags
        </label>
        <CustomTagInput tags={tags} setTags={setTags} />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block font-medium text-sm">
          Category
        </label>
        <Select
          id="category"
          onChange={setSelectedCategory}
          options={categories}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          value={selectedCategory}
        />
      </div>

      <div className="my-4">
        {isPending ? <Loading /> : <Button type="submit">Confirm</Button>}
      </div>
    </form>
  );
};

export default ProductForm;
