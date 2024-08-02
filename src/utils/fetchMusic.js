import origin from "../../config/origin.json";
import indexedDB from "./indexedDB.js";
import axios from "axios";

const fetchMusic = async (setLoading, storageName, dbName, route, callback) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem(storageName));
  if (stored) {
    const data = await indexedDB.getData(dbName, indexedDB.init);
    callback(data);
    setLoading(false);
  } else {
    try {
      const url = origin.default.origin + route;
      const response = await axios.get(url, { withCredentials: true });
      const data = response.data.music;
      indexedDB.saveData(data, dbName, indexedDB.init);
      localStorage.setItem(storageName, true);
      callback(data);
      console.log(response.data.music);
      if (response.status === 200) setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }
};

export default fetchMusic;
