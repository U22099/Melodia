import axios from 'axios'
import indexedDB from './indexedDB.js'
import origin from '../../config/origin.json'
import logOut from './logOut.js'
import Refresh from './refresh.js'

const deleteUser = async (setErr, navigate) => {
    try {
      const url = origin.default.origin + "/user";
      const accessToken = localStorage.getItem("accessToken");
      const id = JSON.parse(localStorage.getItem('_id')).id
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}/${id}`,
        },
      });
      if (response.status === 200) {
        await logOut(setErr, navigate);
        console.log("Deleted User Successfully");
        navigate("/", { replace: true });
      }
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await Refresh();
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          deleteUser();
        }
      } else {
        setErr({ occured: true, msg: err.message });
      }
    }
  };

  export default deleteUser