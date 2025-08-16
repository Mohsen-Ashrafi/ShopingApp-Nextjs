import { adminPaymentListTableTHeads } from "@/constants/tableHeads";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
}

function PaymentListTable({ payments }: Props) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border border-gray-300 rounded-xl">
        <thead className="bg-gray-100 text-gray-700 font-semibold text-[11px] md:text-xs">
          <tr>
            {adminPaymentListTableTHeads.map((item) => (
              <th
                key={item.id}
                className="whitespace-nowrap px-2 py-2 md:px-4 md:py-3 border-b border-gray-300 text-center"
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[10px] md:text-xs">
          {payments.map((payment, index) => (
            <tr
              key={payment._id}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4 md:py-2">
                {index + 1}
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4">
                {payment.invoiceNumber}
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4 max-w-[120px] md:max-w-[200px] truncate">
                {payment.description}
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4">
                <div className="flex flex-col gap-0.5 items-center max-w-[140px] md:max-w-full truncate">
                  <span>{payment.user.name}</span>
                  <span className="text-[9px] text-gray-500 truncate">
                    {payment.user.email}
                  </span>
                  <span className="font-medium truncate">
                    {payment.user.phoneNumber}
                  </span>
                </div>
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4">
                <div className="flex flex-wrap gap-1 justify-center max-w-[140px] md:max-w-full overflow-hidden">
                  {payment.cart.productDetail.map((product) => (
                    <span
                      key={product._id}
                      className="bg-gray-200 rounded px-2 py-0.5 text-[9px] md:text-[11px] truncate"
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4 font-semibold text-[11px] md:text-sm">
                ${payment.amount}
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4">
                {payment.status === "COMPLETED" ? (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[9px] md:text-xs">
                    Successful
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[9px] md:text-xs">
                    Failed
                  </span>
                )}
              </td>
              <td className="text-center border-b border-gray-300 px-2 py-1 md:px-4">
                <Tooltip title="View">
                  <Link href={`/admin/payments/${payment._id}`}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentListTable;
