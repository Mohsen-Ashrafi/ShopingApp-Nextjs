"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface OtpResponse {
  message: string;
  otp: string;
  role: "ADMIN" | "USER";
  phoneNumber: string;
  expiresIn: number;
  user?: {
    isActive: boolean;
  };
}

const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [time, setTime] = useState<number>(RESEND_TIME);
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null);
  const router = useRouter();

  const {
    data: otpResponse,
    isPending,
    mutateAsync: mutateGetOtp,
  } = useMutation<
    OtpResponse,
    AxiosError<{ message: string }>,
    { phoneNumber: string }
  >({
    mutationFn: getOtp,
  });

  const { mutateAsync: mutateCheckOtp, isPending: isCheckingOtp } = useMutation<
    { message: string; user: { isActive: boolean } },
    AxiosError<{ message: string }>,
    { phoneNumber: string; otp: string }
  >({
    mutationFn: checkOtp,
  });

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (
    e?: FormEvent<HTMLFormElement> | React.MouseEvent,
    customPhoneNumber?: string
  ) => {
    if (e) e.preventDefault();
    const targetPhone = customPhoneNumber || phoneNumber;

    try {
      const data = await mutateGetOtp({ phoneNumber: targetPhone });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
      setRole(data.role);
      setPhoneNumber(targetPhone);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "خطایی رخ داد");
    }
  };

  const checkOtpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);

      if (role === "ADMIN") {
        router.push("/admin");
      } else if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={handlePhoneNumberChange}
            onSubmit={sendOtpHandler}
            isPending={isPending}
            onAdminClick={() => {
              sendOtpHandler(undefined, "09123456789");
            }}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep(1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderStep()}</div>
    </div>
  );
}

export default AuthPage;

