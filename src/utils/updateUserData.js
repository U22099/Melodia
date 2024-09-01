import Refresh from "./refresh.js";
import axios from "axios";
import indexedDB from "./indexedDB.js";
import origin from "../../config/origin.json";

const updateUserData = async (
  navigate,
  username,
  email,
  image,
  setText,
  text,
  setErrorText,
  setUpdating
) => {
  if (username && email && image) {
    try {
      let x = 0;
      const myInterval = setInterval(() => {
        const arr = [".", "..", "..."];
        if (x === 3) {
          setText("Updating");
          x = 0;
        } else {
          setText("Updating" + arr[x]);
          x++;
        }
      }, 500);
      setUpdating(true);
      const DATA = {
        username: username,
        email: email,
        image: image,
      };
      console.log(DATA);
      const url = origin.default.origin + "/user";
      const accessToken = localStorage.getItem("accessToken");
      const id = JSON.parse(localStorage.getItem('_id')).id
      const response = await axios.put(url, DATA, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}/${id}`,
        },
      });
      indexedDB.saveData(
        {
          username: username,
          email: email,
          image: image,
        },
        "UserData",
        indexedDB.init
      );
      localStorage.setItem("user_stored", true);
      clearInterval(myInterval);
      setText("Done");
      setTimeout(() => {
        setText("Save");
      }, 2000);
      setUpdating(false);
    } catch (err) {
      if (err.response && [401, 402, 403, 404].includes(err.response.status)) {
        const res = await Refresh(navigate);
        if (res.status === 200) updateUserData();
      } else {
        console.log(err);
        setUpdating(false);
        setErrorText(err.response?.data.message);
      }
    }
  }
};

export default updateUserData;
