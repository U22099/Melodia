import Footer from './Footer'
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

export const Context = React.createContext();

const Body = ({ page, setErr, err }) => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState({ refresh: false, first: true });
  const [confirm, setConfirm] = useState({ask: false, result: false});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("image.JPG");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [music, setMusic] = useState("012345678910".split(""));
  const [recentMusic, setRecentMusic] = useState("012345".split(""));
  const [topMusic, setTopMusic] = useState("012345".split(""));
  const [devData, setDevData] = useState("01".split(""));
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState();
  const [x, setX] = useState();
  const [audio, setAudio] = useState();
  const play = (file, x) => {
    setX(x);
    setFile(file);
    setIsPlaying(true);
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
      setLoading,
      "recent_music_stored",
      "RecentMusicData",
      "/musicapi/recent",
      setRecentMusic
    );
    retrieveStoredData(
      refresh,
      setRefresh,
      setLoading,
      "top_music_stored",
      "TopMusicData",
      "/musicapi/top",
      setTopMusic
    );
    fetchDevData(
      refresh,
      setRefresh,
      setLoading,
      "dev_data_stored",
      "DevData",
      "/user/dev",
      setDevData,
      navigate
    );
    fetchMusic(
      refresh,
      setRefresh,
      setLoading,
      "music_stored",
      "MusicData",
      "/musicapi",
      setMusic
    );
  }, [refresh.refresh])
  useEffect(() => {
    if(confirm.result){
      deleteUser(setErr, navigate);
    }
  }, [confirm.result])
    

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
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
        setConfirm
      }}
    >
      <div className="ml-[16px] relative">
        {page === 1 ? <Home /> : ""}
        {page === 2 ? <Search /> : ""}
        {page === 3 ? <Profile /> : ""}
        {page === 4 ? <Upload /> : ""}
        <Footer isPlaying={isPlaying} setIsPlaying={setIsPlaying} x={x} setX={setX} file={file} play={play} setErr={setErr} audio={audio} setAudio={setAudio}/>
      </div>

      {err.occured ? <ErrorDialog msg={err.msg} /> : ""}
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
