import axios from "axios";
import origin from "../../config/origin.json";
import indexedDB from "./indexedDB";
import Refresh from "./refresh.js";

const fetchUserData = async (
  refresh,
  setLoading,
  setImage,
  setEmail,
  setUsername,
  navigate
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem("user_stored"));
  if (stored && refresh.first) {
    const data = await indexedDB.getData("UserData", indexedDB.init);
    if(data){
      setImage(data.image);
      setEmail(data.email);
      setUsername(data.username)
      setLoading(false);
    } else {
      localStorage.setItem("user_stored", JSON.stringify(false))
      fetchUserData(
        refresh,
        setLoading,
        setImage,
        setEmail,
        setUsername,
        navigate
      ) 
    }
  } else {
    try {
      const url = origin.default.origin + "/user";
      const accessToken = localStorage.getItem("accessToken");
      const id = JSON.parse(localStorage.getItem('_id')).id
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization:`Bearer ${accessToken}/${id}`,
        },
      });
      setImage(response.data.image);
      setEmail(response.data.email);
      setUsername(response.data.username);
      if (response.status === 200) setLoading(false);
      indexedDB.saveData(response.data, "UserData", indexedDB.init);
      localStorage.setItem("user_stored", true);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await Refresh(navigate);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          fetchUserData(
            refresh,
            setLoading,
            setImage,
            setEmail,
            setUsername,
            navigate
          );
        }
      } else {
        // props.setErr({ occured: true, msg: err.message });
        console.log(err);
      }
      if (err.message.includes("Network")) {
        fetchUserData(
          refresh,
          setLoading,
          setImage,
          setEmail,
          setUsername,
          navigate
        );
      }
    }
  }
};

export default fetchUserData;
