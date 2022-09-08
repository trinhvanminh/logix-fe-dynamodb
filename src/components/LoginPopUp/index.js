import { yupResolver } from "@hookform/resolvers/yup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Checkbox, Grid, Stack, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoginApi, RegisterApi, ResetPasswordApi } from "../../apis/Auth";
import { setAuthenticated } from "../../store/Auth";
import { setIsOpenLoginPopUp, setLoading } from "../../store/Global";
import CustomButton from "../CustomButton";

const LoginPopUp = () => {
  const [isLoginMode, setIsLoginMode] = useState(1);
  const open = useSelector((state) => state.Global.isOpenLoginPopUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setIsOpenLoginPopUp(false));
  };

  const handleChangeLoginMode = (data) => {
    reset();
    setIsLoginMode(data);
  };

  const schemaLogin = yup
    .object({
      usernameOremail: yup
        .string()
        .required("Username or email is required")
        .test(
          "username-or-email",
          "Enter valid Username/Email",
          function (value) {
            const emailRegex =
              /* eslint-disable-next-line */
              /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const usernameRegex = /^[a-z0-9_-]{3,16}$/;
            let isValidEmail = emailRegex.test(value);
            let isValidUsername = usernameRegex.test(value);
            if (!isValidEmail && !isValidUsername) {
              return false;
            }
            return true;
          }
        ),
      password: yup.string().required("Password is required"),
    })
    .required();
  const schemaForgotPassword = yup
    .object({
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
    })
    .required();
  const schemaRegister = yup
    .object({
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
      username: yup
        .string()
        .min(2, "Mininum 2 characters")
        .max(30, "Maximum 30 characters")
        .test("username", "Enter valid Username", function (value) {
          const usernameRegex = /^[a-z0-9_-]{3,16}$/;
          let isValidEmail = usernameRegex.test(value);
          if (!isValidEmail) {
            return false;
          }
          return true;
        })
        .required("Username is required"),
      password: yup.string().required("Password is required"),
      password_confirm: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    })
    .required();

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(
      isLoginMode === 1
        ? schemaLogin
        : isLoginMode === 2
        ? schemaRegister
        : schemaForgotPassword
    ),
  });
  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    if (isLoginMode === 1) {
      const isEmail =
        /* eslint-disable-next-line */
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          data.usernameOremail
        );
      const payload = {
        email: isEmail && data.usernameOremail,
        username: !isEmail && data.usernameOremail,
        password: data.password,
      };
      const { response } = await LoginApi(payload);
      if (response) {
        handleClose();
        localStorage.setItem("token", response.accessToken);
        dispatch(setAuthenticated(true));
      }
      dispatch(setLoading(false));
    }
    if (isLoginMode === 2) {
      const { response } = await RegisterApi(data);
      if (response) {
        handleClose();
        localStorage.setItem("token", response.accessToken);
        dispatch(setAuthenticated(true));
      }
      dispatch(setLoading(false));
    }
    if (isLoginMode === 3) {
      const { response } = await ResetPasswordApi(data);
      if (response) {
        handleChangeLoginMode(4);
      }
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    let flag = true;
    flag && setIsLoginMode(1);
    return () => {
      flag = false;
    };
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ ".MuiPaper-root": { bgcolor: (theme) => theme.default.bgColor } }}
      >
        {isLoginMode === 1 && (
          <DialogContent
            sx={{
              maxWidth: "433px",
              p: "40px",
              ".MuiInputBase-root": {
                bgcolor: "white",
              },
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              Login
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginTop: "30px" }}
            >
              <Grid container rowSpacing={"36px"}>
                <Grid item xs={12}>
                  <Controller
                    name="usernameOremail"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label
                            htmlFor="usernameOremail"
                            style={{ color: "white" }}
                          >
                            Email or Username:
                          </label>
                          <TextField
                            id="usernameOremail"
                            fullWidth
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
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label htmlFor="password" style={{ color: "white" }}>
                            Password:
                          </label>
                          <TextField
                            fullWidth
                            id="password"
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
                <Grid item xs={12} sx={{ pt: "16px !important" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center"></Stack>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: 14,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeLoginMode(3)}
                    >
                      Forgot password?
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    pt: "23px !important",
                  }}
                >
                  <CustomButton type="submit" fullWidth>
                    Sign In
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
            <Stack alignItems="center">
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  pt: 15,
                  color: "#fff",
                }}
              >
                Don't have any account?
                <Typography
                  component="span"
                  sx={{
                    color: "white",
                    fontWeight: 400,
                    fontSize: 14,
                    cursor: "pointer",
                    ml: 1,
                    textDecoration: "underline",
                  }}
                  onClick={() => handleChangeLoginMode(2)}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Stack>
          </DialogContent>
        )}
        {isLoginMode === 2 && (
          <DialogContent
            sx={{
              maxWidth: "433px",
              p: "40px",
              ".MuiInputBase-root": {
                bgcolor: "white",
              },
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              Sign Up
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginTop: "30px" }}
            >
              <Grid container rowSpacing={"20px"}>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label htmlFor="email" style={{ color: "white" }}>
                            Email:
                          </label>
                          <TextField
                            id="email"
                            fullWidth
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
                <Grid item xs={12}>
                  <Controller
                    name="username"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label htmlFor="username" style={{ color: "white" }}>
                            Username:
                          </label>
                          <TextField
                            id="username"
                            fullWidth
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
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label htmlFor="password" style={{ color: "white" }}>
                            Password:
                          </label>
                          <TextField
                            fullWidth
                            id="password"
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
                <Grid item xs={12}>
                  <Controller
                    name="password_confirm"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label htmlFor="password2" style={{ color: "white" }}>
                            Confirm Password:
                          </label>
                          <TextField
                            fullWidth
                            id="password2"
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
                <Grid
                  item
                  xs={12}
                  sx={{
                    pt: "40px !important",
                  }}
                >
                  <CustomButton type="submit" fullWidth>
                    Sign Up
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
            <Stack alignItems="center">
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  pt: 2,
                  color: "white",
                }}
              >
                Have any account?
                <Typography
                  component="span"
                  sx={{
                    color: "white",
                    fontWeight: 400,
                    fontSize: 14,
                    cursor: "pointer",
                    ml: 1,
                    textDecoration: "underline",
                  }}
                  onClick={() => handleChangeLoginMode(1)}
                >
                  Sign In
                </Typography>
              </Typography>
            </Stack>
          </DialogContent>
        )}
        {isLoginMode === 3 && (
          <DialogContent sx={{ maxWidth: "433px", p: "40px" }}>
            <Typography variant="h4" sx={{ color: "white" }}>
              Forgot Password
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginTop: "30px" }}
            >
              <Grid container rowSpacing={"36px"}>
                <Grid
                  item
                  xs={12}
                  sx={{ ".MuiInputBase-root": { bgcolor: "white" } }}
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({
                      field: { onChange },
                      fieldState: { error },
                    }) => {
                      return (
                        <>
                          <label htmlFor="email" style={{ color: "white" }}>
                            Email:
                          </label>
                          <TextField
                            id="email"
                            fullWidth
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
                <Grid
                  item
                  xs={12}
                  sx={{
                    pt: "40px !important",
                  }}
                >
                  <CustomButton type="submit" fullWidth>
                    Submit
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
            <Stack alignItems="center">
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  pt: 15,
                  color: "white",
                }}
              >
                Have any account?
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    cursor: "pointer",
                    ml: 1,
                    textDecoration: "underline",
                  }}
                  onClick={() => handleChangeLoginMode(1)}
                >
                  Sign In
                </Typography>
              </Typography>
            </Stack>
          </DialogContent>
        )}
        {isLoginMode === 4 && (
          <DialogContent sx={{ maxWidth: "433px", p: "40px" }}>
            <Stack spacing={2} alignItems="center" justifyContent="center">
              <Checkbox
                checked
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
                disableRipple
                sx={{
                  color: "#27AE60",
                  "&.Mui-checked": {
                    color: "#27AE60",
                  },
                }}
              />
              <Typography
                sx={{ fontSize: 20, textAlign: "center", color: "white" }}
              >
                Check your email
              </Typography>
              <Typography
                sx={{ fontSize: 14, textAlign: "center", color: "white" }}
              >
                Please check the email address for instructions to reset your
                password.
              </Typography>

              <CustomButton
                fullWidth
                onClick={() => {
                  navigate("/");
                  dispatch(setIsOpenLoginPopUp(false));
                }}
              >
                Home
              </CustomButton>
            </Stack>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
export default LoginPopUp;
