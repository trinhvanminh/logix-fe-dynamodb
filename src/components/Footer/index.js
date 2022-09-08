import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Footer = () => {
  const footerSx = {
    color: "#ccc",
    cursor: "pointer",
    ":hover": {
      color: "white",
    },
  };
  return (
    <Box sx={{ bgcolor: (theme) => theme.default.bgColor, py: 1 }}>
      <Divider sx={{ bgcolor: (theme) => theme.default.secondBgColor }} />
      <Container maxWidth="lg">
        <Grid container sx={{ my: 2 }} spacing={2}>
          <Grid item xs={6} sm={3}>
            <Stack spacing={2}>
              <Typography sx={footerSx}>Liên hệ</Typography>
              <Typography sx={footerSx}>Giới thiệu</Typography>
              <Typography sx={footerSx}>Bản quyền</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack spacing={2}>
              <Typography sx={footerSx}>Phim bộ</Typography>
              <Typography sx={footerSx}>Phim lẻ</Typography>
              <Typography sx={footerSx}>Phim chiếu rạp</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack spacing={2}>
              <Typography sx={footerSx}>Quảng cáo</Typography>
              <Typography sx={footerSx}>Góp ý</Typography>
              <Typography sx={footerSx}>Đầu tư</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack spacing={2}>
              <Stack
                sx={footerSx}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <FacebookIcon sx={{ color: "#4267B2" }} />
                <span>Facebook</span>
              </Stack>
              <Stack
                sx={footerSx}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <TwitterIcon sx={{ color: "#00acee" }} />
                <span>Twitter</span>
              </Stack>
              <Stack
                sx={footerSx}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <InstagramIcon sx={{ color: "#fb3958" }} />
                <span>Instagram</span>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
