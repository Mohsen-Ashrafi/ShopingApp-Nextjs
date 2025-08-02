import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import Button from "@/components/Button";
import { ChangeEvent, FormEvent } from "react";

interface SendOTPFormProps {
  phoneNumber: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  onAdminClick?: () => void;
}

function SendOTPForm({
  phoneNumber,
  onChange,
  onSubmit,
  isPending,
  onAdminClick,
}: SendOTPFormProps) {
  return (
    <div className="max-w-sm mx-auto px-4 w-full">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <p className="text-sm sm:texg-lg text-gray-600">
            To register or log in, please enter your phone number below. We’ll
            send you a verification code.
          </p>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
        </div>

        <div className="space-y-4">
          {isPending ? (
            <Loading />
          ) : (
            <>
              <Button type="submit">Send Verification Code</Button>
              <div className="space-y-1">
                <p className="text-sm sm:texg-lg text-gray-600 mt-16 mb-4">
                  Want to access the admin dashboard? Use this option:
                </p>
                <Button type="button" onClick={() => onAdminClick?.()}>
                  Admin Role Login
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
