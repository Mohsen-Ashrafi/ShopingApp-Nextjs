import Select, { ActionMeta, SingleValue } from "react-select";
import TextField from "@/common/TextField";
import Loading from "@/common/Loading";
import Button from "./Button";
import React from "react";

export const categoryTypes = [
  {
    id: 1,
    label: "Product",
    value: "product",
  },
  {
    id: 2,
    label: "Post",
    value: "post",
  },
  {
    id: 3,
    label: "Ticket",
    value: "ticket",
  },
  {
    id: 4,
    label: "Comment",
    value: "comment",
  },
] as const;

export type CategoryType = (typeof categoryTypes)[number];

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  category: {
    title?: string;
    englishTitle?: string;
    description?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedType?: CategoryType | null;
  setSelectedType: (
    val: SingleValue<CategoryType>,
    action?: ActionMeta<CategoryType>
  ) => void;
  isPending: boolean;
}

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  category,
  handleChange,
  selectedType = null,
  setSelectedType,
  isPending,
}) => {
  return (
    <div className="w-full max-w-sm mb-10 px-2 sm:px-0">
      <form className="space-y-3 sm:space-y-4" onSubmit={onSubmit}>
        <TextField
          name="title"
          label="title"
          value={category.title || ""}
          onChange={handleChange}
          className="text-sm sm:text-base"
        />
        <TextField
          name="englishTitle"
          label="englishTitle"
          value={category.englishTitle || ""}
          onChange={handleChange}
          className="text-sm sm:text-base"
        />
        <TextField
          name="description"
          label="description"
          value={category.description || ""}
          onChange={handleChange}
          className="text-sm sm:text-base"
        />
        <div>
          <label
            htmlFor="type"
            className="my-1 sm:my-2 block text-sm sm:text-base"
          >
            Type
          </label>
          <Select
            instanceId="type"
            onChange={setSelectedType}
            options={categoryTypes}
            defaultValue={selectedType}
            className="text-sm sm:text-base"
          />
        </div>
        <div className="my-3 sm:my-4">
          {isPending ? <Loading /> : <Button type="submit">Confirm</Button>}
        </div>
      </form>
    </div>
  );
};
export default CategoryForm;
