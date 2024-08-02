import origin from "../../config/origin.json";
import indexedDB from "./indexedDB.js";
import refresh from "./refresh.js";
import axios from "axios";

const fetchDevData = async (
  setLoading,
  storageName,
  dbName,
  route,
  callback,
  navigate
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem(storageName));
  if (stored) {
    const data = await indexedDB.getData(dbName, indexedDB.init);
    callback(data);
    setLoading(false);
  } else {
    try {
      const url = origin.default.origin + route;
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data.admin;
      indexedDB.saveData(data, dbName, indexedDB.init);
      localStorage.setItem(storageName, true);
      callback(data);
      console.log(response.data.admin);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          fetchDevData(
            setLoading,
            storageName,
            dbName,
            route,
            callback,
            navigate
          );
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/", { replace: true });
        }
      } else {
        // props.setErr({ occured: true, msg: err.message });
      }
      if (err.message.includes("Network")) {
        fetchDevData();
      }
    }
  }
};

export default fetchDevData;
