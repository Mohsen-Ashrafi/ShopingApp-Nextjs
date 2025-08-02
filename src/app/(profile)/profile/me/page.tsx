"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import Button from "@/components/Button";
import { useGetUser } from "@/hooks/useAuth";
import { updateProfile } from "@/services/authServices";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormEvent, JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ResponsiveHeader from "../ResponsiveHeader";
import { User } from "@/types/authTypes";

type FormDataType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  biography?: string;
  [key: string]: string | undefined;
};

function MePage(): JSX.Element {
  const [formData, setFormData] = useState<FormDataType>({});
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({ mutationFn: updateProfile });

  const includeskey: (keyof User)[] = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) {
      const raw = includeObj(user, includeskey);
      const sanitized: FormDataType = Object.fromEntries(
        Object.entries(raw).map(([key, value]) => [
          key,
          value?.toString() || "",
        ])
      );
      setFormData(sanitized);
    }
  }, [user]);

  if (isLoading) return <Loading />;

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-2 sm:px-4 py-6">
      {/* Header */}
      <ResponsiveHeader title="User Information" />

      <form onSubmit={submitHandler} className="space-y-5">
        {user &&
          Object.keys(includeObj(user, includeskey)).map((key) => {
            return (
              <TextField
                name={key}
                label={key}
                key={key}
                value={formData[key] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            );
          })}
        <div>
          {isPending ? <Loading /> : <Button type="submit">Confirm</Button>}
        </div>
      </form>
    </div>
  );
}

export default MePage;
