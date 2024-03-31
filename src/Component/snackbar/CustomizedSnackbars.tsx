import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
interface CustomizedSnackbarProps {
  status: string;
  message: string;
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CustomizedSnackbars(
  props: Readonly<CustomizedSnackbarProps>
) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    props.setShowSnackbar(false);
    setOpen(false);
  };
  console.log("hey");
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center  " }}
      >
        <Alert
          onClose={() => handleClose()}
          severity={props.status === "error" ? "error" : "success"}
          variant="filled"
          sx={{ width: "30%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
