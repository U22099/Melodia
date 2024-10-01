import origin from '../../config/origin.json';
import axios from 'axios';

const logOut = async (showErr, navigate) => {
    try {
      const url = origin.default.origin + "/logout";
      const id = JSON.parse(localStorage.getItem('_id')).id
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id}`
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_stored");
        navigate("/", { replace: true });
      }
    } catch (err) {
      showErr({ occured: true, msg: err.message });
    }
};

export default logOut