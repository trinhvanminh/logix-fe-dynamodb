import axios from "axios";
// export const baseUrl = "http://192.168.50.52:4000";
// export const baseUrl = "https://logix-film.herokuapp.com";
export const baseUrl = "https://logix-film-v2.herokuapp.com";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
