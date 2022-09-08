import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsOpenLoginPopUp } from "../../store/Global";
import CustomButton from "../CustomButton";
import UserMenu from "../UserMenu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const isAuthenticated = useSelector((state) => state.Auth.authenticated);
  const [scrollTop, setScrollTop] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleBgColorOnScroll = () => {
      setScrollTop(window.pageYOffset);
    };
    window.addEventListener("scroll", handleBgColorOnScroll);
    return () => {
      window.removeEventListener("scroll", handleBgColorOnScroll);
    };
  }, [scrollTop]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "56px",
        position: "fixed",
        top: 0,
        backgroundColor: (theme) =>
          scrollTop < 40 ? theme.default.bgColor : theme.default.secondBgColor,
        zIndex: 999,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <IconButton
            color="inherit"
            sx={{
              mr: 2,
              display: {
                lg: "none",
                xl: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Button sx={{ height: "100%" }} onClick={() => navigate("/")}>
            <img
              src={require("../../assets/images/logix-logo.png")}
              alt="logo"
              onClick={() => navigate("/")}
              style={{ height: "54px" }}
            />
          </Button>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              height: "100%",
              ".MuiTabs-scroller": {
                height: "100%",
                ".MuiTabs-flexContainer": {
                  height: "100%",
                },
                ".MuiButtonBase-root": {
                  color: "white",
                },
              },
              display: {
                lg: "block",
                xl: "block",
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <Tab value={1} label="Phim mới" />
            <Tab value={2} label="Phim lẻ" />
            <Tab value={3} label="Phim bộ" />
            <Tab value={4} label="Phim chiếu rạp" />
          </Tabs>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              alignItems: "center",
              height: "32px",
              minWidth: "140px",
              justifyContent: "right",
            }}
          >
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <CustomButton onClick={() => dispatch(setIsOpenLoginPopUp(true))}>
                Login
              </CustomButton>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
