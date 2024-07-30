import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdRefresh, MdOutlineClose } from "react-icons/md";
import axios from "axios";
import indexedDB from "../../utils/indexedDB.js";
import ErrorDialog from "../../utils/ErrorDialog";
import ConfirmDialog from "../../utils/ConfirmDialog";
import SuccessDialog from "../../utils/SuccessDialog";
import origin from "../../../config/origin.json";

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
      uploader: "Daniel"
    },
    {
        title: "Lil Wayne || Mirror",
        artist: "Lorem",
        image: "Logo.jpg",
        uploader: "Daniel"
      },
  ]);
  const [outputData, setOutputData] = useState(music.slice());
  const filterOutput = () => {

    setOutputData(
      music
    );
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
    <div>
        <section className="p-[10px] pb-[20px] ">
        {loading ? (
          <div id="loader">
            <p></p>
          </div>
        ) : (
          <ol className="flex gap-[10px] overflow-auto overflow-y-hidden">
            {outputData.map((x, i) => (
              <li
                key={i}
                onClick={() => {
                  const audio = document.getElementById("audio");
                  audio?.pause();
                  props.play(music, i);
                }}
                className="w-[150px]"
              >
                <div className="cursor-pointer p-[10px] rounded-[10px] flex flex-col gap-[5px] items-start">
                  <img
                    src={x.image}
                    onDoubleClick={() => {
                      id = x._id;
                      console.log(id, x._id);
                      setConfirm(true);
                    }}
                    alt="Music Picture"
                    className="bg-[black] rounded-[15px] w-36 h-36 m-[0px]"
                  />
                  <div className="">
                    <h1 className="font-extrabold md:text-[1.3em] font-serif m-[0px ml-[5px]">
                      {x.title}
                    </h1>
                    <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-serif m-[0px ml-[5px]">
                      Uploaded by {x.uploader}
                    </h1>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

export default Explore