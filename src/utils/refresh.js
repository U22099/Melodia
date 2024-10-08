import axios from "axios";
import origin from "../../config/origin.json";

const Refresh = async (navigate) => {
  try {
    const url = origin.default.origin + "/refresh";
    const refreshToken = localStorage.getItem("refreshToken");
    const id = JSON.parse(localStorage.getItem('_id')).id
    const response = await axios.post(
      url,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}/${id}`,
        },
      }
    );
    if (response.status === 200) return response;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 403 || err.response.status === 401)
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/", { replace: true });
      return err.response;
    }
  }
};

export default Refresh;
