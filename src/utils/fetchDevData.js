import indexedDB from "./indexedDB.js";
import Refresh from "./refresh.js";
import origin from "../../config/origin.json";
import axios from "axios";

const fetchDevData = async (
  refresh,
  setLoading,
  storageName,
  dbName,
  route,
  callback,
  navigate
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem(storageName));
  console.log(stored, refresh);
  if (stored && refresh.first) {
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
      if (response.status === 200) setLoading(false);
    } catch (err) {
      console.log(err.message);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await Refresh(navigate);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          fetchDevData(
            refresh,
            setLoading,
            storageName,
            dbName,
            route,
            callback,
            navigate
          );
      } else {
        // props.setErr({ occured: true, msg: err.message });
        console.log(err);
      }
      if (err.message.includes("Network")) {
        fetchDevData(
            refresh,
            setLoading,
            storageName,
            dbName,
            route,
            callback,
            navigate
          );
      }
      }
    }
  }
};

export default fetchDevData;
