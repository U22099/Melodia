import origin from "../../config/origin.json";
import indexedDB from "./indexedDB.js";
import axios from "axios";

const retrieveStoredData = async (
  refresh,
  setLoading,
  storageName,
  dbName,
  route,
  callback
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem(storageName));
  if (stored && refresh.first) {
    const data = await indexedDB.getData(dbName, indexedDB.init);
    console.log(`Data from ${dbName} `);
    if(data){
      callback(data);
      setLoading(false);
    } else {
      localStorage.setItem(storageName, JSON.stringify(false))
      retrieveStoredData(
        refresh,
        setLoading,
        storageName,
        dbName,
        route,
        callback
      );
    }
  } else {
    await fetchMusic(setLoading, storageName, dbName, route, callback);
    setLoading(false);
  }
};
const fetchMusic = async (setLoading, storageName, dbName, route, callback) => {
  try {
    const url = origin.default.origin + route;
    const response = await axios.get(url, { withCredentials: true });
    const data = response.data.music;
    callback(data);
    if (response.status === 200) setLoading(false);
    indexedDB.saveData(data, dbName, indexedDB.init);
    localStorage.setItem(storageName, true);
    console.log(response.data.music);
  } catch (err) {
    console.log(err.message);
  }
};

export default retrieveStoredData;
