import { productListTableTHeads } from "@/constants/tableHeads";
import Link from "next/link";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRemoveProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Product } from "@/types/product";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { useState } from "react";

interface Props {
  products: Product[];
}

function ProductListTable({ products }: Props) {
  const { mutateAsync } = useRemoveProduct();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null
  );

  const removeProductHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
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
    await removeProductHandler(selectedProductId);
    setOpenDialog(false);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              {productListTableTHeads.map((item) => (
                <th
                  key={item.id}
                  className="whitespace-nowrap px-2 py-2 sm:px-4 sm:py-2 border-b border-gray-200 text-center"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {index + 1}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4 font-bold truncate max-w-[120px] sm:max-w-none">
                  {product.title}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {typeof product.category === "object" &&
                  "title" in product.category
                    ? product.category.title
                    : "-"}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {product.price}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {product.discount}%
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {product.offPrice}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {product.countInStock}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <Tooltip title="View">
                      <Link href={`/admin/products/${product._id}`}>
                        <IconButton
                          color="primary"
                          size="small"
                          className="p-1 sm:p-2"
                        >
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
                          handleDeleteClick(product._id, product.title)
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
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <IconButton
                          color="secondary"
                          size="small"
                          className="p-1 sm:p-2"
                        >
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

export default ProductListTable;
