import Footer from "./Footer";
import Home from "./BodyComponents/Home.jsx";
import Search from "./BodyComponents/Search.jsx";
import Profile from "./BodyComponents/Profile.jsx";
import Upload from "./BodyComponents/Upload.jsx";
import fetchMusic from "../utils/fetchMusic.js";
import fetchDevData from "../utils/fetchDevData.js";
import fetchUserData from "../utils/fetchUserData.js";
import updateUserData from "../utils/updateUserData.js";
import deleteUser from "../utils/deleteUser.js";
import retrieveStoredData from "../utils/fetchTopAndRecentMusic.js";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../utils/ErrorDialog";
import SuccessDialog from "../utils/SuccessDialog";
import ConfirmDialog from "../utils/ConfirmDialog";
import fetchMusicDataById from "../utils/fetchMusicDataById.js";

export const Context = React.createContext();

const Body = ({ page, setErr, err }) => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState({ refresh: false, first: true });
  const [confirm, setConfirm] = useState({ ask: false, result: false });
  const [loading, setLoading] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [image, setImage] = useState("image.JPG");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [music, setMusic] = useState("012345678910".split(""));
  const [recentMusic, setRecentMusic] = useState("012345".split(""));
  const [topMusic, setTopMusic] = useState("012345".split(""));
  const [devData, setDevData] = useState("01".split(""));
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [file, setFile] = useState();
  const [pause, setPause] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const X = useRef(0);
  const Index = useRef(0);

  const play = async (index, x) => {
    setLoaded(false);
    X.current = x;
    Index.current = index;
    const OBJ = [
      recentMusic,
      topMusic,
      music,
      setRecentMusic,
      setTopMusic,
      setMusic,
    ];
    setFile(OBJ[index]);
    setIsPlaying(true);
    try {
      const src = await fetchMusicDataById(
        OBJ[index],
        x,
        OBJ[index][x]._id,
        setErr,
        OBJ[index + 3]
      );
      src && setLoaded(true);
      src && setPause(false);
      audio.src = src;
    } catch (err) {
      setIsPlaying(false);
      console.log(err, " erruuug");
    }
  };
  useEffect(() => {
    fetchUserData(
      refresh,
      setRefresh,
      setLoading,
      setImage,
      setEmail,
      setUsername,
      navigate
    );
    retrieveStoredData(
      refresh,
      setRefresh,
      setLoadingA,
      "recent_music_stored",
      "RecentMusicData",
      "/musicapi/recent",
      setRecentMusic
    );
    retrieveStoredData(
      refresh,
      setRefresh,
      setLoadingB,
      "top_music_stored",
      "TopMusicData",
      "/musicapi/top",
      setTopMusic
    );
    fetchDevData(
      refresh,
      setRefresh,
      setLoadingC,
      "dev_data_stored",
      "DevData",
      "/user/dev",
      setDevData,
      navigate
    );
    fetchMusic(
      refresh,
      setRefresh,
      setLoadingD,
      "music_stored",
      "MusicData",
      "/musicapi",
      setMusic
    );
  }, [refresh.refresh]);
  useEffect(() => {
    if (confirm.result) {
      deleteUser(setErr, navigate);
    }
  }, [confirm.result]);

  return (
    <Context.Provider
      value={{
        loading,
        loadingA,
        loadingB,
        loadingC,
        loadingD,
        image,
        setImage,
        email,
        setEmail,
        username,
        setUsername,
        updateUserData,
        recentMusic,
        topMusic,
        devData,
        setMusic,
        music,
        setRefresh,
        refresh,
        play,
        audio,
        setConfirm,
      }}
    >
      <div className="ml-[16px]">
        {page === 1 ? <Home /> : ""}
        {page === 2 ? <Search /> : ""}
        {page === 3 ? <Profile /> : ""}
        {page === 4 ? <Upload setErr={setErr} username={username} /> : ""}
        <Footer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          file={file}
          setErr={setErr}
          audio={audio}
          loaded={loaded}
          play={play}
          setPause={setPause}
          pause={pause}
          index={Index}
          x={X}
        />
      </div>

      {err.occured ? <ErrorDialog msg={err.msg} setErr={setErr} /> : ""}
      {/*
      {upload.show ? <SuccessDialog msg={upload.msg} /> : ""}*/}
      {confirm.ask ? (
        <ConfirmDialog
          callback={setConfirm}
          var2={setConfirm}
          msg="Are you sure about this, buddy?"
        />
      ) : (
        ""
      )}
    </Context.Provider>
  );
};

export default Body;
