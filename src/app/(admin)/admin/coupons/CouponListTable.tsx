import { Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { couponListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupons";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Coupon } from "@/types/coupon";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { useState } from "react";

interface Props {
  coupons: Coupon[];
}

export default function CouponTable({ coupons }: Props) {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null
  );

  const removeCouponHandler = async (id: string) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
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
    await removeCouponHandler(selectedProductId);
    setOpenDialog(false);
  };

  return (
    <>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border rounded-xl text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              {couponListTableTHeads.map((item) => (
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
            {coupons.map((coupon, index) => (
              <tr
                key={coupon._id}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {index + 1}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4 font-bold">
                  {coupon.code}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  <span className="badge badge--primary">{coupon.type}</span>
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {coupon.amount}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  <div className="flex flex-col items-center gap-1">
                    {coupon.productIds?.map((p) => (
                      <span
                        key={p._id}
                        className="badge badge--secondary whitespace-nowrap"
                      >
                        {p.title}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {coupon.usageCount}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {coupon.usageLimit}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  {new Date(coupon.expireDate).toLocaleDateString("en-GB")}
                </td>
                <td className="text-center border-b px-2 py-2 sm:px-4">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <Tooltip title="View">
                      <Link href={`/admin/coupons/${coupon._id}`}>
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
                          handleDeleteClick(coupon._id, coupon.code)
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
                      <Link href={`/admin/coupons/edit/${coupon._id}`}>
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
