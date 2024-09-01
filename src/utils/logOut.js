import origin from '../../config/origin.json'
import axios from 'axios'

const logOut = async (showErr, navigate) => {
    try {
      const url = origin.default.origin + "/logout";
      const id = localStorage.getItem("_id");
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/", { replace: true });
      }
    } catch (err) {
      showErr({ occured: true, msg: err.message });
    }
};

export default logOut