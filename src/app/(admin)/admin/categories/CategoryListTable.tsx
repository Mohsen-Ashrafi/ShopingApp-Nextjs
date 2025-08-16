import Link from "next/link";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { categoryListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Category } from "@/types/category";
import { useState } from "react";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

interface Props {
  categories: Category[];
}

function CategoryListTable({ categories }: Props) {
  const { mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null
  );

  const removeCategoryHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProductId) return;
    await removeCategoryHandler(selectedProductId);
    setOpenDialog(false);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-xl text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              {categoryListTableTHeads.map((item) => (
                <th
                  key={item.id}
                  className="whitespace-nowrap px-2 py-2 sm:px-4 sm:py-2 border-b border-gray-300 text-center"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="text-center border-b border-gray-300 px-2 py-2 sm:px-4">
                  {index + 1}
                </td>
                <td className="text-center border-b border-gray-300 px-2 py-2 sm:px-4 font-bold">
                  {category.title}
                </td>
                <td className="text-center border-b border-gray-300 px-2 py-2 sm:px-4 truncate max-w-[120px]">
                  {category.description}
                </td>
                <td className="text-center border-b border-gray-300 px-2 py-2 sm:px-4">
                  <span className="text-white bg-gray-500 p-2 rounded-lg">
                    {category.type}
                  </span>
                </td>
                <td className="text-center border-b border-gray-300 px-2 py-2 sm:px-4">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <Tooltip title="View">
                      <Link href={`/admin/categories/${category._id}`}>
                        <IconButton color="primary" size="small">
                          <VisibilityIcon
                            sx={{
                              fontSize: {
                                xs: "16px",
                                sm: "24px",
                              },
                            }}
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() =>
                          handleDeleteClick(category._id, category.title)
                        }
                      >
                        <DeleteIcon
                          sx={{
                            fontSize: {
                              xs: "16px",
                              sm: "24px",
                            },
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <Link href={`/admin/categories/edit/${category._id}`}>
                        <IconButton color="secondary" size="small">
                          <EditIcon
                            sx={{
                              fontSize: {
                                xs: "16px",
                                sm: "24px",
                              },
                            }}
                          />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        productName={selectedProductName || ""}
      />
    </>
  );
}

export default CategoryListTable;
