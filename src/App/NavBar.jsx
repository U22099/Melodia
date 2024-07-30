import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel";
import indexedDB from "../utils/indexedDB.js";
import toBase64 from "./../utils/Base64.js";
import ErrorDialog from "../utils/ErrorDialog";
import SuccessDialog from "../utils/SuccessDialog";
import ConfirmDialog from "../utils/ConfirmDialog";
import axios from "axios";
import origin from "../../config/origin.json";

const NavBar = (props) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Save");
  const [errorText, setErrorText] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [upload, setUpload] = useState({ state: null, msg: "" });
  const [confirm, setConfirm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [image, setImage] = useState("image.JPG");
  const email = useRef("");
  const username = useRef("");
  const fetchUserData = async () => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem("user_stored"));
    if (stored && !forceRefresh) {
      const data = await indexedDB.getData("UserData", indexedDB.init);
      setImage(data.image);
      email.current = data.email;
      username.current = data.username;
      if (data.isAdmin) {
        props.setIsAdmin(true);
      }
      setForceRefresh(true);
      setLoading(false);
    } else {
      try {
        const url = origin.default.origin + "/user";
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(url, {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        indexedDB.saveData(response.data, "UserData", indexedDB.init);
        localStorage.setItem("user_stored", true);
        setImage(response.data.image);
        email.current = response.data.email;
        username.current = response.data.username;
        if (response.data.isAdmin) {
          props.setIsAdmin(true);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        if ([401, 403].includes(err.response.status)) {
          const res = await refresh();
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            fetchUserData();
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/", { replace: true });
          }
        } else {
          props.setErr({ occured: true, msg: err.message });
        }
        if (err.message.includes("Network")) {
          fetchUserData();
        }
      }
    }
  };
  const refresh = async () => {
    try {
      const url = origin.default.origin + "/refresh";
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + refreshToken,
          },
        }
      );
      if (response.status === 200) return response;
    } catch (err) {
      if (err.response.status === 403 || err.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/", { replace: true });
      }
    }
  };
  const handleImage = async (e) => {
    const data = await toBase64(e.target.files[0]);
    setImage(data);
  };
  const switchVisibility = (e) => {
    setMenu(!menu);
    e.target.style.border = menu ? "none" : "3px solid var(--secondary-color)";
  };
  const updateUserData = async () => {
    if (username && email && image) {
      try {
        setText(<a id="roll1"></a>);
        const DATA = {
          username: username.current,
          email: email.current,
          image: image,
        };
        const url = origin.default.origin + "/user";
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.put(url, DATA, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        });
        indexedDB.saveData(
          {
            username: username.current,
            email: email.current,
            image: image,
            otherData: otherData,
          },
          "UserData",
          indexedDB.init
        );
        localStorage.setItem("store1", true);
        setText("Save");
      } catch (err) {
        if ([401, 402, 403, 404].includes(err.response.status)) {
          const res = await refresh();
          if (res.status === 200) updateUserData();
        } else {
          setErrorText(err.response.data.message);
        }
      }
    }
  };

  const uploadMusic = async () => {
    try {
      setUpload({ state: false, msg: "" });
      const file = Array.from(document.getElementById("upload").files);
      const output = await Promise.all(
        file.map(async (x) => await convertMusic(x))
      );
      const url = origin.default.origin + "/musicapi";
      const DATA = output.map((x) => {
        return {
          artist: x.artist,
          title: x.title,
          genre: x.genre,
          image: x.image,
          data: x.data,
          uploader: username.current,
        };
      });
      const response = await axios.post(url, DATA, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setUpload({ state: true, msg: response.data.message, show: true });
        setFileCount(0);
      }
    } catch (err) {
      props.setErr({ occured: true, msg: err.message });
      setUpload({ state: true, msg: err.response.data.message, show: false });
    }
  };
  const convertMusic = async (file) => {
    const data = await toBase64(file);
    const { artist, title, genre, image } = await getMusicMetaData(file);

    return {
      artist: artist,
      title: title,
      genre: genre,
      image: image,
      data: data,
    };
  };
  const getMusicMetaData = async (file) => {
    const jsmediatags = window.jsmediatags;

    return new Promise((resolve, reject) => {
      jsmediatags.read(file, {
        onSuccess: async (tag) => {
          const result = {
            artist: tag.tags.artist || "---",
            title: tag.tags.title,
            genre: tag.tags.genre || "---",
            image: tag.tags.picture
              ? await toBase64(
                  new Blob([new Uint8Array(tag.tags.picture.data)], {
                    type: tag.tags.picture.format,
                  })
                )
              : toBase64("image.JPG"),
          };
          console.log(result);
          resolve(result);
        },
        onError: (err) => {
          reject(tag);
        },
      });
    });
  };
  const deleteUser = async () => {
    try {
      const url = origin.default.origin + "/user";
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      if (response.status === 200) {
        await logOut();
        console.log("Deleted User Successfully");
        navigate("/", { replace: true });
      }
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh();
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          deleteUser();
        } else {
          navigate("/", { replace: true });
        }
      } else {
        props.setErr({ occured: true, msg: err.message });
      }
    }
  };
  useEffect(() => {
    //fetchUserData();
  }, []);
  return (
    <>
      <div className="flex gap-[10px] items-center ml-[20px]">
        <h1 className="cursor-pointer transition ease-in font-[Roboto] text-gray-300 hover:text-white active">Explore</h1>
        <h1  className="cursor-pointer transition ease-in font-[Roboto] text-gray-300 hover:text-white">All</h1>
      </div>
      <div className="flex justify-end align-center items-center">
        <img
          src={image}
          alt="Profile Picture"
          className={
            (loading ? "profileLoader " : "") +
            "bg-[var(--primary-color)] rounded-full w-12 h-12 cursor-pointer"
          }
          onClick={switchVisibility}
        />
        
          {props.isAdmin ? (
            <p
              className="link text-[var(--secondary-color)] mt-[5px] text-[1.2em]"
              onClick={() => setShowAdminPanel(true)}
            >
              Admin Panel
            </p>
          ) : (
            ""
          )}
      </div>
      {props.err.occured ? <ErrorDialog msg={props.err.msg} /> : ""}{props.err.occured ? <ErrorDialog msg={props.err.msg} /> : ""}
      {upload.show ? <SuccessDialog msg={upload.msg} /> : ""}
      {confirm ? (
        <ConfirmDialog
          callback={deleteUser}
          var2={setConfirm}
          msg="Are you sure about this, buddy?"
        />
      ) : (
        ""
      )}
      {showAdminPanel ? (
        <AdminPanel
          setShowAdminPanel={setShowAdminPanel}
          setErr={props.setErr}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
