"use client";
import TextField from "@/common/TextField";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "@/services/authServices";
import Loading from "@/common/Loading";
import { AxiosError } from "axios";

interface CompleteProfileInput {
  name: string;
  email: string;
}

function CompleteProfile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { isPending, mutateAsync } = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    CompleteProfileInput
  >({
    mutationFn: completeProfile,
  });
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({ name, email });
      toast.success(message);
      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextField
            name="name"
            label="First and Last Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            {isPending ? <Loading /> : <Button type="submit">Confirm</Button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
