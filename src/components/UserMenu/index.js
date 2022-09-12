import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { Avatar, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutFbProdiver } from "../../apis/Auth";
import { baseUrl } from "../../apis/AxiosClient";
import { setAuthenticated } from "../../store/Auth";
import stringAvatar from "../../utils/stringAvatar";

export default function UserMenu({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "profile" : undefined;
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    if (user?.provider) {
      // if (user?.provider === "facebook") {
      //   logoutFbProdiver().then((res) => {
      //     // window.open(`${baseUrl}/api/auth/logout`, "_self");
      //     console.log(res);
      //   });
      // } else {
      //   window.open(`${baseUrl}/api/auth/logout`, "_self");
      // }
      window.open(`${baseUrl}/api/auth/logout`, "_self");
    }
    localStorage.removeItem("token");
    // dispatch(setAuthenticated(false));
  };
  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        disableRipple
      >
        <Avatar
          src={user?.picture}
          {...stringAvatar(user?.displayName || user?.username || "A")}
        />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            backgroundColor: (theme) => theme.default.secondBgColor,
            color: "white",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon sx={{ color: "white" }}>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ color: "white" }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
