import origin from "../../config/origin.json";
import indexedDB from "../utils/indexedDB.js";
import axios from "axios";

const retrieveStoredData = async (
  setLoading,
  storageName,
  dbName,
  route,
  callback
) => {
  setLoading(true);
  console.log("Called");
  const stored = JSON.parse(localStorage.getItem(storageName));
  if (stored) {
    const data = await indexedDB.getData(dbName, indexedDB.init);
    callback(data);
    setLoading(false);
  } else {
    await fetchMusic(setLoading, storageName, dbName, route, callback);
  }
};
const fetchMusic = async (setLoading, storageName, dbName, route, callback) => {
  try {
    const url = origin.default.origin + "/musicapi/" + route;
    const response = await axios.get(url, { withCredentials: true });
    const data = response.data.music;
    indexedDB.saveData(data, dbName, indexedDB.init);
    localStorage.setItem(storageName, true);
    callback(data);
    console.log(response.data.music);
    setLoading(false);
  } catch (err) {
    console.log(err.message);
  }
};

export default retrieveStoredData;
