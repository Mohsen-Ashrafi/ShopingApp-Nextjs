import { userPaymentTHeads } from "@/constants/tableHeads";
import { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
}

function PaymentTable({ payments }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-xl text-xs sm:text-sm">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {userPaymentTHeads.map((item) => (
              <th
                key={item.id}
                className="whitespace-nowrap px-2 sm:px-4 py-2 border-b border-gray-200 text-center text-[11px] sm:text-sm"
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={payment._id}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="text-center border-b px-2 sm:px-4 py-2 text-[11px] sm:text-sm">
                {index + 1}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-2 text-[11px] sm:text-sm">
                {payment.invoiceNumber}
              </td>
              <td
                className="text-center border-b px-2 sm:px-4 py-2 max-w-[200px] sm:max-w-[280px] whitespace-nowrap truncate
               text-[11px] sm:text-sm"
              >
                {payment.description}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-2 text-[11px] sm:text-sm">
                <div className="flex flex-col gap-1 items-center">
                  {payment.cart.productDetail.map((product) => (
                    <span
                      className="bg-gray-200 rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-gray-800"
                      key={product._id}
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-2 text-[11px] sm:text-sm">
                ${payment.amount}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-2 text-[11px] sm:text-sm">
                {new Date(payment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="text-center border-b px-4 py-2">
                {payment.status === "COMPLETED" ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium">
                    Successful
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium">
                    Unsuccessful
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;
