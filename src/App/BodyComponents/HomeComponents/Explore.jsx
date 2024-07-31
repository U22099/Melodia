import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdRefresh, MdOutlineClose } from "react-icons/md";
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
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [music, setMusic] = useState([
    {
      title: "Lil Wayne || Mirror",
      artist: "Lorem",
      image: "Logo.jpg",
      uploader: "Daniel",
    },
    {
      title: "Lil Wayne || Mirror",
      artist: "Lorem",
      image: "Logo.jpg",
      uploader: "Daniel",
    },
    {
      title: "Lil Wayne || Mirror",
      artist: "Lorem",
      image: "Logo.jpg",
      uploader: "Daniel",
    },
    {
      title: "Lil Wayne || Mirror",
      artist: "Lorem",
      image: "Logo.jpg",
      uploader: "Daniel",
    },
  ]);
  const [devData, setDevData] = useState([
    {
      username: "Daniel",
      image: "image.JPG",
      email: "nifemiolaniyi4@gmail.com",
      role: "Developer",
    },
    {
      username: "Swag",
      image: "image.JPG",
      email: "swaggarlicious@gmail.com",
      role: "Designer",
    },
  ]);
  const [outputData, setOutputData] = useState(music.slice());
  const filterOutput = () => {
    setOutputData(music);
  };
  const refreshState = () => {
    setSpinning(true);
    setForceRefresh(true);
    setRefresh(!refresh);
  };
  const retrieveStoredData = async () => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem("music_stored"));
    console.log("stored");
    if (stored) {
      setOutputData([]);
      const data = await indexedDB.getData("MusicData", indexedDB.init);
      setMusic(data);
      console.log(data);
      setForceRefresh(true);
      setLoading(false);
    } else {
      await fetchMusic();
    }
  };
  const fetchMusic = async () => {
    try {
      setOutputData([]);
      const url = origin.default.origin + "/musicapi";
      const response = await axios.get(url, { withCredentials: true });
      const data = response.data.music.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      indexedDB.saveData(response.data.music, "MusicData", indexedDB.init);
      localStorage.setItem("music_stored", true);
      setMusic(data);
      console.log(response.data.music);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      props.setErr({ occured: true, msg: err.message });
    }
  };
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
  };
  useEffect(() => {
    setOutputData(music.slice());
    filterOutput();
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  }, [music]);
  useEffect(() => {
    if (forceRefresh) {
      //fetchMusic();
    } else {
      //retrieveStoredData();
    }
  }, [refresh]);
  return (
    <div className="overflow-auto overflow-x-hidden max-h-[85vh] w-[100%]">
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[10px] font-[Roboto]">
          <h1>Recently uploaded</h1>
        </header>
        <MusicList loading={loading} outputData={outputData} />
      </section>
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[10px] font-[Roboto]">
          <h1>Top Five</h1>
        </header>
        <MusicList loading={loading} outputData={outputData} />
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
