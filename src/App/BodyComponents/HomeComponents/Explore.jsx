import { useState, useEffect } from "react";
import axios from "axios";
import indexedDB from "../../../utils/indexedDB.js";
import Developers from "./ExploreComponents/Developers";
import MusicList from "./ExploreComponents/MusicList";
import ErrorDialog from "../../../utils/ErrorDialog";
import ConfirmDialog from "../../../utils/ConfirmDialog";
import SuccessDialog from "../../../utils/SuccessDialog";
import origin from "../../../../config/origin.json";

const Explore = () => {
  let id = "";
  const [loading, setLoading] = useState(false);
  const [recentMusic, setRecentMusic] = useState([]);
  const [topMusic, setTopMusic] = useState([]);
  const [devData, setDevData] = useState([]);
  const retrieveStoredData = async (storageName, dbName, route, callback) => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem(storageName));
    if (stored) {
      const data = await indexedDB.getData(dbName, indexedDB.init);
      callback(data)
      setLoading(false);
    } else {
      await fetchMusic(storageName, dbName, route, callback);
    }
  };
  const fetchMusic = async (storageName, dbName, route, callback) => {
    try {
      const url = origin.default.origin + "/musicapi/"+route;
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
  /*
  const deleteMusic = async () => {
    if (props.isAdmin) {
      try {
        alert(id);
        setSuccess(false);
        const url = origin.default.origin + "/musicapi";
        const response = await axios.delete(
          url,
          { _id: id },
          { withCredentials: true }
        );
        if (response.status === 200) setSuccess(true);
      } catch (err) {
        props.setErr({ occured: true, msg: err.message });
      }
    }
  };*/
  useEffect(() => {
    retrieveStoredData('recent_music_stored', 'RecentMusicData', 'recent', setRecentMusic);
    retrieveStoredData('top_music_stored', 'TopMusicData', 'top', setTopMusic);
    retrieveStoredData('dev_data_stored', 'DevData', 'dev', setDevData);
  }, []);
  return (
    <div className="overflow-auto overflow-x-hidden max-h-[85vh] w-[100%]">
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[10px] font-[Roboto]">
          <h1>Recently uploaded</h1>
        </header>
        <MusicList loading={loading} outputData={recentMusic} />
      </section>
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[10px] font-[Roboto]">
          <h1>Top Six</h1>
        </header>
        <MusicList loading={loading} outputData={topMusic} />
      </section>
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[10px] font-[Roboto]">
          <h1>Developers</h1>
        </header>
        <Developers loading={loading} devData={devData} />
      </section>
    </div>
  );
};

export default Explore;
