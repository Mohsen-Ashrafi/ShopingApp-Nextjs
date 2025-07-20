"use client";
import Loading from "@/common/Loading";
import { useGetOneUser } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import dayjs from "dayjs";
import { JSX } from "react";
import { User } from "@/types/authTypes";

function UserDetailPage(): JSX.Element {
  const { id } = useParams();
  const { data, isLoading } = useGetOneUser(id as string);
  const user: User | undefined = data?.user;
  const router = useRouter();

  if (isLoading) return <Loading />;

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 gap-4">
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {user.name}
            {user.isVerifiedPhoneNumber && (
              <VerifiedIcon color="success" fontSize="small" />
            )}
          </h1>
          <p className="text-gray-600 capitalize">{user.role}</p>

          <div className="border-t mt-2 pt-2 space-y-1 text-sm text-gray-700">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Biography:</strong> {user.biography}
            </p>
            <p>
              <strong>Active:</strong> {user.isActive ? "Yes" : "No"}
            </p>
            <p>
              <strong>Liked Products:</strong> {user.likedProducts?.length ?? 0}
            </p>
            <p>
              <strong>Cart Items:</strong> {user.cart?.products?.length ?? 0}
            </p>
            <p>
              <strong>Products:</strong> {user.Products?.length ?? 0}
            </p>
            <p>
              <strong>OTP Code:</strong> {user.otp?.code ?? "N/A"}
            </p>
            <p>
              <strong>OTP Expires In:</strong>{" "}
              {user.otp?.expiresIn
                ? dayjs(user.otp.expiresIn).format("YYYY-MM-DD HH:mm")
                : "N/A"}
            </p>
          </div>

          <div className="text-xs text-gray-500 mt-2 border-t pt-2">
            <p>Created: {dayjs(user.createdAt).format("YYYY-MM-DD HH:mm")}</p>
            <p>Updated: {dayjs(user.updatedAt).format("YYYY-MM-DD HH:mm")}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
