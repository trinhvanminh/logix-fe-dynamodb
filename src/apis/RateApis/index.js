import { toast } from "react-toastify";
import axiosClient, { baseUrl } from "../AxiosClient";

export const createOrUpdateRateApi = async ({ movie_id, rate_status }) => {
  const url = `${baseUrl}/api/rates/${movie_id}`;
  try {
    const response = await axiosClient.patch(url, { rate_status });
    return { response: response.data, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with createOrUpdateRateApi
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};
