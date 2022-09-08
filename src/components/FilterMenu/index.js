import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import CustomButton from "../CustomButton";

export default function FilterMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CustomButton
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ textTransform: "capitalize" }}
      >
        -- Tất cả --
      </CustomButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root": {
            bgcolor: (theme) => theme.default.bgColor,
            color: "white",
          },
        }}
      >
        <MenuItem onClick={handleClose} disableRipple>
          Phim lẻ
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Phim bộ
        </MenuItem>
      </Menu>
    </div>
  );
}
