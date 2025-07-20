import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import Button from "@/components/Button";
import { ChangeEvent, FormEvent } from "react";

interface SendOTPFormProps {
  phoneNumber: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

function SendOTPForm({
  phoneNumber,
  onChange,
  onSubmit,
  isPending,
}: SendOTPFormProps) {
  return (
    <div className="max-w-sm mx-auto px-4 w-full">
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <Button type="submit">Send Verification Code</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
