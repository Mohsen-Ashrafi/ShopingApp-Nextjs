"use client";

import Select from "react-select";
import TextField from "@/common/TextField";
import Loading from "@/common/Loading";
import Button from "./Button";
import CustomTagInput from "./CustomTagInput";
import { Category } from "@/types/category";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export interface ProductData {
  title: string;
  description: string;
  slug: string;
  brand: string;
  price: string | number;
  discount: string | number;
  offPrice: string | number;
  countInStock: string | number;
  imageLinks?: string[];
}

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  productData: ProductData;
  productDataOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: (option: Category | null) => void;
  isPending: boolean;

  imageFiles: File[];
  setImageFiles: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

const productsFormData = [
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
  imageFiles,
  setImageFiles,
  imagePreviews,
  setImagePreviews,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    const updatedFiles = [...imageFiles, ...newFiles].slice(0, 4);
    setImageFiles(updatedFiles);

    const newPreviews: string[] = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === newFiles.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 4));
        }
      };
    });
  };

  const handleRemovePreview = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleRemoveOldImage = (index: number) => {
    const newLinks = [...(productData.imageLinks || [])];
    newLinks.splice(index, 1);
    productData.imageLinks = newLinks;
  };
  console.log("imageLinks", productData.imageLinks);

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {productsFormData.map((item) => (
        <TextField
          key={item.id}
          label={item.label}
          name={item.name}
          value={String(productData[item.name as keyof ProductData] ?? "")}
          onChange={productDataOnChange}
        />
      ))}

      {/* Upload Images */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Product Images (max 4)
        </label>

        {productData.imageLinks && productData.imageLinks.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: 2,
              mb: 2,
            }}
          >
            {productData.imageLinks.map((src, idx) => (
              <Box
                key={`old-${idx}`}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 100,
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={src}
                  alt={`Old ${idx}`}
                  fill
                  style={{ objectFit: "cover" }}
                />

                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "white",
                  }}
                  onClick={() => handleRemoveOldImage(idx)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* 📌 عکس‌های جدید */}
        {imagePreviews.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: 2,
              mb: 2,
            }}
          >
            {imagePreviews.map((src, idx) => (
              <Box
                key={`new-${idx}`}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 100,
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={src}
                  alt={`Old ${idx}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "white",
                  }}
                  onClick={() => handleRemovePreview(idx)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Upload Button */}
        {imagePreviews.length + (productData.imageLinks?.length || 0) < 4 && (
          <label className="flex items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <span className="text-gray-500">+ Click or drag to upload</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
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
