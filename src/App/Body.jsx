import Home from "./BodyComponents/Home.jsx";
import Search from "./BodyComponents/Search.jsx";
import Profile from "./BodyComponents/Profile.jsx";
import Upload from "./BodyComponents/Upload.jsx";
import fetchUserData from "../utils/fetchUserData.js";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Context = React.createContext();

const Body = ({ page }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("image.JPG");
  const email = useRef();
  const username = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData(setLoading, setImage, email, username, navigate);
  }, []);

  return (
    <Context.Provider
      value={[loading, setLoading, image, setImage, email, username]}
    >
      <div>
        {page === 1 ? <Home /> : ""}
        {page === 2 ? <Search /> : ""}
        {page === 3 ? <Profile /> : ""}
        {page === 4 ? <Upload /> : ""}
      </div>
    </Context.Provider>
  );
};

export default Body;
