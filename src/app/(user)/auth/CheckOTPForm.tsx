import Button from "@/components/Button";
import OTPInput from "react-otp-input";
import {
  Button as MuiButton,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "@/common/Loading";
import React, { FormEvent, MouseEvent } from "react";

// function CheckOTPForm({
//   otpResponse,
//   onSubmit,
//   otp,
//   setOtp,
//   onBack,
//   time,
//   onResendOtp,
// }) {
//   return (
//     <div>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <MuiButton variant="text" onClick={onBack} color="secondary">
//           Back
//         </MuiButton>

//         {otpResponse && (
//           <Typography variant="body2" color="text.secondary">
//             {otpResponse.message}
//           </Typography>
//         )}

//         <Tooltip title="Edit phone number">
//           <IconButton onClick={onBack} color="primary">
//             <EditIcon />
//           </IconButton>
//         </Tooltip>

//         {time > 0 ? (
//           <Typography variant="body2" color="text.secondary">
//             {time} seconds to resend code.
//           </Typography>
//         ) : (
//           <MuiButton variant="text" onClick={onResendOtp} color="primary">
//             Resend code?
//           </MuiButton>
//         )}
//       </Stack>

//       <form className="space-y-10" onSubmit={onSubmit}>
//         <Typography variant="h6" align="center" mb={1}>
//           Enter the verification code
//         </Typography>

//         <OTPInput
//           value={otp}
//           onChange={setOtp}
//           numInputs={6}
//           renderSeparator={<span>-</span>}
//           inputStyle={{
//             width: "2.5rem",
//             padding: "0.5rem 0.2rem",
//             border: "1px solid rgb(183, 197, 255)",
//             borderRadius: "0.5rem",
//           }}
//           containerStyle="flex gap-x-2 justify-center"
//           renderInput={(props) => <input {...props} />}
//         />

//         <Button type="submit">Confirm</Button>
//       </form>
//     </div>
//   );
// }

// export default CheckOTPForm;

interface OTPResponse {
  message: string;
}

interface CheckOTPFormProps {
  otpResponse?: OTPResponse | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  otp: string;
  setOtp: (otp: string) => void;
  onBack: () => void;
  time: number;
  onResendOtp: (e: MouseEvent<HTMLButtonElement>) => void;
  isCheckingOtp: boolean;
}

const CheckOTPForm: React.FC<CheckOTPFormProps> = ({
  otpResponse,
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOtp,
  isCheckingOtp,
}) => {
  return (
    <Box
      className="w-full"
      maxWidth={{ xs: "100%", sm: "24rem" }}
      marginX="auto"
      paddingX={2}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={1}
      >
        <MuiButton variant="text" onClick={onBack} color="secondary">
          Back
        </MuiButton>

        {otpResponse && (
          <Typography variant="body2" color="text.secondary">
            {otpResponse.message}
          </Typography>
        )}

        <Tooltip title="Edit phone number">
          <IconButton onClick={onBack} color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>

        {time > 0 ? (
          <Typography variant="body2" color="text.secondary">
            {time} seconds to resend code.
          </Typography>
        ) : (
          <MuiButton variant="text" onClick={onResendOtp} color="primary">
            Resend code?
          </MuiButton>
        )}
      </Stack>

      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <Typography variant="h6" align="center">
            Enter the verification code
          </Typography>

          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            inputStyle={{
              width: "2.5rem",
              padding: "0.5rem 0.2rem",
              border: "1px solid rgb(183, 197, 255)",
              borderRadius: "0.5rem",
            }}
            containerStyle="flex gap-x-2 justify-center"
            renderInput={(props) => <input {...props} />}
          />

          <div>
            {isCheckingOtp ? (
              <Loading />
            ) : (
              <Button type="submit">Confirm</Button>
            )}
          </div>
        </Stack>
      </form>
    </Box>
  );
};

export default CheckOTPForm;
