import Select from "react-select";
import TextField from "@/common/TextField";
import Loading from "@/common/Loading";
import Button from "./Button";
import React from "react";
import { Category } from "@/types/category";
import CustomTagInput from "./CustomTagInput";

export interface ProductData {
  title: string;
  description: string;
  slug: string;
  brand: string;
  price: string | number;
  discount: string | number;
  offPrice: string | number;
  countInStock: string | number;
  imageLink: string;
  [key: string]: string | number | undefined;
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
}

const productsFormData = [
  {
    id: 1,
    label: "Title",
    name: "title",
  },
  {
    id: 2,
    label: "Description",
    name: "description",
  },
  {
    id: 3,
    label: "Slug",
    name: "slug",
  },
  {
    id: 4,
    label: "Brand",
    name: "brand",
  },
  {
    id: 5,
    label: "Price",
    name: "price",
  },
  {
    id: 6,
    label: "Discount",
    name: "discount",
  },
  {
    id: 7,
    label: "Discounted Price",
    name: "offPrice",
  },
  {
    id: 8,
    label: "Stock",
    name: "countInStock",
  },
  {
    id: 9,
    label: "Product Image Link",
    name: "imageLink",
  },
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
}) => {
  return (
    <form className="space-y-4 text-sm sm:text-base" onSubmit={onSubmit}>
      {productsFormData.map((item) => {
        return (
          <TextField
            key={item.id}
            label={item.label}
            name={item.name}
            value={String(productData[item.name] ?? "")}
            onChange={productDataOnChange}
          />
        );
      })}
      <div className="w-full">
        <label htmlFor="tags" className="block my-2 font-medium">
          Tags
        </label>
        <CustomTagInput tags={tags} setTags={setTags} />
      </div>

      <div className="w-full">
        <label htmlFor="category" className="block mb-2 font-medium">
          Category
        </label>
        <Select<Category>
          id="category"
          onChange={(newValue) => setSelectedCategory(newValue)}
          options={categories}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          value={selectedCategory}
          className="text-sm"
          styles={{
            control: (base) => ({
              ...base,
              fontSize: "0.875rem",
            }),
          }}
        />
      </div>
      <div className="my-4">
        {isPending ? (
          <Loading />
        ) : (
          <Button type="submit" className="text-sm">
            Confirm
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;

// import Select from "react-select";
// import ReactTagInput from "@pathofdev/react-tag-input";
// import TextField from "@/common/TextField";
// import Loading from "@/common/Loading";
// import Button from "./Button";
// import Image from "next/image";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

// const productsFormData = [
//   { id: 1, label: "Title", name: "title" },
//   { id: 2, label: "Description", name: "description" },
//   { id: 3, label: "Slug", name: "slug" },
//   { id: 4, label: "Brand", name: "brand" },
//   { id: 5, label: "Price", name: "price" },
//   { id: 6, label: "Discount", name: "discount" },
//   { id: 7, label: "Discounted Price", name: "offPrice" },
//   { id: 8, label: "Stock", name: "countInStock" },
// ];

// function ProductForm({
//   tags,
//   setTags,
//   onSubmit,
//   productData,
//   productDataOnChange,
//   categories,
//   selectedCategory,
//   setSelectedCategory,
//   isPending,
//   coverImageUrl,
//   setCoverImageUrl,
//   setCoverImageFile,
// }) {
//   return (
//     <form className="space-y-4" onSubmit={onSubmit}>
//       {productsFormData.map((item) => (
//         <TextField
//           key={item.id}
//           label={item.label}
//           name={item.name}
//           value={productData[item.name] ?? ""}
//           onChange={productDataOnChange}
//         />
//       ))}

//       {/* Image Link Field */}
//       <TextField
//         label="Product Image Link"
//         name="imageLink"
//         value={productData.imageLink}
//         onChange={productDataOnChange}
//       />

//       {/* Upload Real Image */}
//       <div>
//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           Upload Product Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(event) => {
//             const file = event.target.files[0];
//             if (file) {
//               setCoverImageFile(file);
//               setCoverImageUrl(URL.createObjectURL(file));
//             }
//           }}
//         />
//         {coverImageUrl && (
//           <div className="relative mt-2 w-full h-48 border rounded overflow-hidden">
//             <Image
//               src={coverImageUrl}
//               alt="Preview"
//               layout="fill"
//               objectFit="cover"
//             />
//             <IconButton
//               size="small"
//               onClick={() => {
//                 setCoverImageFile(null);
//                 setCoverImageUrl(null);
//               }}
//               className="!absolute top-1 right-1 bg-white"
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </div>
//         )}
//       </div>

//       {/* Tags */}
//       <div>
//         <label htmlFor="">Tags</label>
//         <ReactTagInput
//           tags={tags}
//           onChange={(newTags) => setTags(newTags)}
//           placeholder="Add a tag"
//         />
//       </div>

//       {/* Category */}
//       <div>
//         <label htmlFor="category" className="mb-2">
//           Category
//         </label>
//         <Select
//           id="category"
//           onChange={setSelectedCategory}
//           options={categories}
//           getOptionLabel={(option) => option.title}
//           getOptionValue={(option) => option._id}
//           defaultValue={selectedCategory}
//         />
//       </div>

//       {/* Submit */}
//       <div className="my-4">
//         {isPending ? <Loading /> : <Button type="submit">Confirm</Button>}
//       </div>
//     </form>
//   );
// }

// export default ProductForm;
