import Home from "./BodyComponents/Home.jsx";
import Search from "./BodyComponents/Search.jsx";
import Profile from "./BodyComponents/Profile.jsx";
import Upload from "./BodyComponents/Upload.jsx";
import fetchUserData from "../utils/fetchUserData.js";
import updateUserData from "../utils/updateUserData.js";
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

  useEffect(() => {
    fetchUserData(setLoading, setImage, setEmail, setUsername, navigate);
  }, []);

  return (
    <Context.Provider
      value={[loading, setLoading, image, setImage, email, setEmail, username, setUsername, updateUserData]}
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
