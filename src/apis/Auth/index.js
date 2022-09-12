import axiosClient, { baseUrl } from "../AxiosClient";
import { toast } from "react-toastify";
import axios from "axios";

export const LoginApi = async (payload) => {
  const url = `${baseUrl}/api/auth/login`;
  try {
    const response = await axiosClient.post(url, payload);
    return { response: response.data, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with the login:
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};

export const RegisterApi = async (payload) => {
  const url = `${baseUrl}/api/auth/register`;
  try {
    const response = await axiosClient.post(url, payload);
    response && toast.success("Successfully registered");
    return { response: response.data, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with the registration:
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};

export const ResetPasswordApi = async (payload) => {
  const url = `${baseUrl}/api/auth/reset-password`;
  try {
    const response = await axiosClient.post(url, payload);
    return { response, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with the reset password:
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};

export const ConfirmResetPasswordApi = async ({ new_password1, userToken }) => {
  const url = `${baseUrl}/api/auth/reset-password/confirm/`;
  try {
    const response = await axios.patch(
      url,
      {
        newpassword: new_password1,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );
    return { response, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with the confirm reset password:
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};

// oauth2

export const getOAuthUser = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/auth/login/success`, {
      withCredentials: true,
    });
    return { response: data, error: null };
  } catch (err) {
    toast.error("something went wrong", err);
    return { response: null, error: err };
  }
};

// re authorization
export const logoutFbProdiver = async () => {
  try {
    const token = localStorage.getItem("providerToken");
    const { data } = await axios.delete(
      "https://graph.facebook.com/me/permissions",
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return { response: data, error: null };
  } catch (err) {
    toast.error("something went wrong with fb logout", err);
    return { response: null, error: err };
  }
};
