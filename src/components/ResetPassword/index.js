import { yupResolver } from "@hookform/resolvers/yup";
import KeyIcon from "@mui/icons-material/Key";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { ConfirmResetPasswordApi } from "../../apis/Auth";
import { setIsOpenLoginPopUp } from "../../store/Global";
import { useDispatch } from "react-redux";
import CustomButton from "../CustomButton";
const schema = yup
  .object({
    new_password1: yup.string().required("Password is required"),
    new_password2: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("new_password1")], "Passwords do not match"),
  })
  .required();
const ResetPassword = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useParams();

  const onSubmit = async (data) => {
    const res = await ConfirmResetPasswordApi({
      ...data,
      userToken,
    });
    if (res) {
      navigate("/");
      dispatch(setIsOpenLoginPopUp(true));
    }
  };
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.default.bgColor,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          py: "10vh",
          bgcolor: (theme) => theme.default.secondBgColor,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          <KeyIcon
            sx={{
              fontSize: 30,
              color: "white",
              transform: "rotate(315deg)",
            }}
          />
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 20,
            mb: 5,
            color: "white",
          }}
          paragraph
        >
          Set New Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            maxWidth={700}
            spacing={4}
            sx={{
              ".MuiInputBase-root": {
                bgcolor: "white",
              },
            }}
          >
            <Grid item xs={12}>
              <Controller
                name="new_password1"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => {
                  return (
                    <>
                      <label htmlFor="new_password1" style={{ color: "white" }}>
                        New Password
                      </label>
                      <TextField
                        fullWidth
                        id="new_password1"
                        type="password"
                        error={error?.message ? true : false}
                        onChange={onChange}
                        autoComplete="off"
                        helperText={error ? error.message : null}
                        bgcolor="white"
                      />
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="new_password2"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => {
                  return (
                    <>
                      <label htmlFor="new_password2" style={{ color: "white" }}>
                        Confirm Password:
                      </label>
                      <TextField
                        fullWidth
                        id="new_password2"
                        type="password"
                        error={error?.message ? true : false}
                        onChange={onChange}
                        autoComplete="off"
                        helperText={error ? error.message : null}
                      />
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <CustomButton type="submit" fullWidth sx={{ mt: 2 }}>
            Submit
          </CustomButton>
          <Typography
            sx={{
              color: "white",
              fontSize: 14,
              textDecoration: "underline",
              cursor: "pointer",
              mt: 2,
            }}
            onClick={() => navigate("/")}
          >
            Go To Home?
          </Typography>
        </form>
      </Container>
    </Box>
  );
};
export default ResetPassword;
