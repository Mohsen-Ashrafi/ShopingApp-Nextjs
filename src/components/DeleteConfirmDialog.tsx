import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteConfirmDialog: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          margin: "auto",
          position: "relative",
          top: "-10%",
          width: "90vw",
          "@media (min-width:600px)": {
            top: "auto",
          },
        },
      }}
    >
      <div className="flex flex-col items-center px-6 py-5 sm:px-8 sm:py-6 font-sans">
        <WarningAmberIcon className="text-red-500 mb-2" fontSize="large" />

        <DialogTitle className="text-red-600 text-center font-bold font-sans">
          Confirm Delete
        </DialogTitle>

        <DialogContent>
          <DialogContentText className="text-center text-gray-700 text-sm font-sans">
            Are you sure you want to delete the product
            <span className="font-semibold text-red-500 mx-1">
              {productName}
            </span>
            ?
          </DialogContentText>
        </DialogContent>

        <DialogActions className="mt-4 gap-2 font-sans">
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
