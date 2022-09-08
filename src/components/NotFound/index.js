import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NotFoundSvg } from "../../assets/images/not-found.svg";
import CustomButton from "../CustomButton";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Stack alignItems="center">
        <NotFoundSvg style={{ width: "100vw", height: "45vh" }} />
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "42px",
            lineHeight: "52px",
            mb: "32px",
            textAlign: "center",
          }}
        >
          Oops, This Page Could Not Be Found.
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "34px",
            textAlign: "center",
            mb: "52px",
          }}
        >
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </Typography>
        <CustomButton
          sx={{
            mb: "182px",
            p: "12px 24px",
            borderRadius: "8px",
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Take me home
        </CustomButton>
      </Stack>
    </div>
  );
};
export default NotFound;
