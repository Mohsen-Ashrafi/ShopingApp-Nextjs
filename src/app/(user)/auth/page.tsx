"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SendOTPForm from "./SendOTPForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface OtpResponse {
  message: string;
  user?: {
    isActive: boolean;
  };
}

const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("09904442764");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<number>(2);
  const [time, setTime] = useState<number>(RESEND_TIME);
  const router = useRouter();
  const {
    data: otpResponse,
    error,
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

  const PhoneNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message || "An error occurred");
    }
  };

  const checkOtpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
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

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={PhoneNumberHandler}
            onSubmit={sendOtpHandler}
            isPending={isPending}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
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
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </div>
  );
}

export default AuthPage;
