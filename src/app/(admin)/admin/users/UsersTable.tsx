import { userListTableHeads } from "@/constants/tableHeads";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { User } from "@/types/authTypes";

interface Props {
  users: User[];
}

function UsersTable({ users }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] sm:min-w-full border rounded-xl text-xs sm:text-sm">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {userListTableHeads.map((item) => (
              <th
                key={item.id}
                className="whitespace-nowrap px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-200 text-center"
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2">
                {index + 1}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2">
                {user.name}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2">
                {user.email}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2">
                <div className="flex items-center justify-center gap-1 text-xs sm:text-sm">
                  {user.phoneNumber}
                  {user.isVerifiedPhoneNumber && (
                    <CheckCircleIcon sx={{ color: "green", fontSize: 16 }} />
                  )}
                </div>
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2">
                <div className="flex flex-wrap justify-center gap-1">
                  {user.Products?.map((product, index) => (
                    <span
                      className="bg-gray-200 rounded-full px-2 sm:px-3 py-[2px] text-[10px] sm:text-xs text-gray-800"
                      key={index}
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2 text-[11px] sm:text-sm">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="text-center border-b px-2 sm:px-4 py-1 sm:py-2">
                <Tooltip title="View">
                  <Link href={`/admin/users/${user._id}`}>
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

export default UsersTable;
