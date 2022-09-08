import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ children, ...rest }) => {
  return (
    <Button
      variant="contained"
      {...rest}
      sx={{
        ...rest.sx,
        bgcolor: (theme) => theme.default.purple,
        ":hover": { bgcolor: (theme) => theme.default.lightPurple },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
