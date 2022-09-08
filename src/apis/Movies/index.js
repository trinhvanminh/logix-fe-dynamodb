import { toast } from "react-toastify";
import axiosClient, { baseUrl } from "../AxiosClient";

export const getMoviesApi = async () => {
  const url = `${baseUrl}/api/movies`;
  try {
    const response = await axiosClient.get(url);
    return { response: response.data, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with getMovies
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};

export const updateMovieApi = async ({ id, ...rest }) => {
  const url = `${baseUrl}/api/movies/${id}`;
  try {
    const response = await axiosClient.patch(url, rest);
    return { response: response.data, error: null };
  } catch (err) {
    toast.error(
      <>
        Something went wrong with updateMovie
        <br />
        {err.response?.data?.message}
      </>
    );
    return { response: null, error: err };
  }
};
