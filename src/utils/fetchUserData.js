import axios from "axios";
import origin from "../../config/origin.json";

const fetchUserData = async (
  setLoading,
  setImage,
  email,
  username,
  navigate
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem("user_stored"));
  if (stored) {
    //&& !forceRefresh) {
    const data = await indexedDB.getData("UserData", indexedDB.init);
    setImage(data.image);
    email.current = data.email;
    username.current = data.username;
    // if (data.isAdmin) {
    //   props.setIsAdmin(true);
    // }
    // setForceRefresh(true);
    setLoading(false);
  } else {
    try {
      const url = origin.default.origin + "/user";
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      indexedDB.saveData(response.data, "UserData", indexedDB.init);
      localStorage.setItem("user_stored", true);
      setImage(response.data.image);
      email.current = response.data.email;
      username.current = response.data.username;
      // if (response.data.isAdmin) {
      //   props.setIsAdmin(true);
      // }
      setLoading(false);
    } catch (err) {
      console.log(err);
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          fetchUserData();
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/", { replace: true });
        }
      } else {
        // props.setErr({ occured: true, msg: err.message });
      }
      if (err.message.includes("Network")) {
        fetchUserData();
      }
    }
  }
};
const refresh = async (navigate) => {
  try {
    const url = origin.default.origin + "/refresh";
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(
      url,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + refreshToken,
        },
      }
    );
    if (response.status === 200) return response;
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/", { replace: true });
    }
  }
};
export default fetchUserData;
