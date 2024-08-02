import Home from "./BodyComponents/Home.jsx";
import Search from "./BodyComponents/Search.jsx";
import Profile from "./BodyComponents/Profile.jsx";
import Upload from "./BodyComponents/Upload.jsx";
import fetchUserData from "../utils/fetchUserData.js";
import updateUserData from "../utils/updateUserData.js";
import retrieveStoredData from "../utils/fetchTopAndRecentMusic.js";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../utils/ErrorDialog";
import SuccessDialog from "../utils/SuccessDialog";
import ConfirmDialog from "../utils/ConfirmDialog";

export const Context = React.createContext();

const Body = ({ page }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("image.JPG");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const [recentMusic, setRecentMusic] = useState("012345".split(""));
  const [topMusic, setTopMusic] = useState("012345".split(""));
  const [devData, setDevData] = useState("01".split(""));
  useEffect(() => {
    fetchUserData(setLoading, setImage, setEmail, setUsername, navigate);
    retrieveStoredData(
      setLoading,
      "recent_music_stored",
      "RecentMusicData",
      "recent",
      setRecentMusic
    );
    retrieveStoredData(
      setLoading,
      "top_music_stored",
      "TopMusicData",
      "top",
      setTopMusic
    );
    retrieveStoredData(
      setLoading,
      "dev_data_stored",
      "DevData",
      "dev",
      setDevData
    );
  }, []);

  return (
    <Context.Provider
      value={[
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
      ]}
    >
      <div>
        {page === 1 ? <Home /> : ""}
        {page === 2 ? <Search /> : ""}
        {page === 3 ? <Profile /> : ""}
        {page === 4 ? <Upload /> : ""}
      </div>

      {/*
      {err.occured ? <ErrorDialog msg={err.msg} /> : ""}
      {upload.show ? <SuccessDialog msg={upload.msg} /> : ""}
      {confirm ? (
        <ConfirmDialog
          callback={deleteUser}
          var2={setConfirm}
          msg="Are you sure about this, buddy?"
        />
      ) : (
        ""
      )}*/}
    </Context.Provider>
  );
};

export default Body;
