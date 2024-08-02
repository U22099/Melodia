import { useContext } from "react";
import { Context } from "./Body";
import Skeleton from "react-loading-skeleton";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import AdminPanel from "../AdminPanel";
// import indexedDB from "../utils/indexedDB.js";
// import toBase64 from "./../utils/Base64.js";
// import origin from "../../config/origin.json";

const NavBar = ({ section, setSection, setMenu, menu }) => {
  const [loading, setLoading, image, setImage, email, username] =
    useContext(Context);
  // const navigate = useNavigate();
  // const [menu, setMenu] = useState(false);
  // const [forceRefresh, setForceRefresh] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [text, setText] = useState("Save");
  //
  //
  // const [upload, setUpload] = useState({ state: null, msg: "" });
  // const [confirm, setConfirm] = useState(false);
  // const [showAdminPanel, setShowAdminPanel] = useState(false);
  // const [image, setImage] = useState("image.JPG");
  //

  // const uploadMusic = async () => {
  //   try {
  //     setUpload({ state: false, msg: "" });
  //     const file = Array.from(document.getElementById("upload").files);
  //     const output = await Promise.all(
  //       file.map(async (x) => await convertMusic(x))
  //     );
  //     const url = origin.default.origin + "/musicapi";
  //     const DATA = output.map((x) => {
  //       return {
  //         artist: x.artist,
  //         title: x.title,
  //         genre: x.genre,
  //         image: x.image,
  //         data: x.data,
  //         uploader: username.current,
  //       };
  //     });
  //     const response = await axios.post(url, DATA, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       setUpload({ state: true, msg: response.data.message, show: true });
  //       setFileCount(0);
  //     }
  //   } catch (err) {
  //     props.setErr({ occured: true, msg: err.message });
  //     setUpload({ state: true, msg: err.response.data.message, show: false });
  //   }
  // };
  // const convertMusic = async (file) => {
  //   const data = await toBase64(file);
  //   const { artist, title, genre, image } = await getMusicMetaData(file);

  //   return {
  //     artist: artist,
  //     title: title,
  //     genre: genre,
  //     image: image,
  //     data: data,
  //   };
  // };
  // const getMusicMetaData = async (file) => {
  //   const jsmediatags = window.jsmediatags;

  //   return new Promise((resolve, reject) => {
  //     jsmediatags.read(file, {
  //       onSuccess: async (tag) => {
  //         const result = {
  //           artist: tag.tags.artist || "---",
  //           title: tag.tags.title,
  //           genre: tag.tags.genre || "---",
  //           image: tag.tags.picture
  //             ? await toBase64(
  //                 new Blob([new Uint8Array(tag.tags.picture.data)], {
  //                   type: tag.tags.picture.format,
  //                 })
  //               )
  //             : toBase64("image.JPG"),
  //         };
  //         console.log(result);
  //         resolve(result);
  //       },
  //       onError: (err) => {
  //         reject(tag);
  //       },
  //     });
  //   });
  // };
  // const deleteUser = async () => {
  //   try {
  //     const url = origin.default.origin + "/user";
  //     const accessToken = localStorage.getItem("accessToken");
  //     const response = await axios.delete(url, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     });
  //     if (response.status === 200) {
  //       await logOut();
  //       console.log("Deleted User Successfully");
  //       navigate("/", { replace: true });
  //     }
  //   } catch (err) {
  //     if ([401, 403].includes(err.response.status)) {
  //       const res = await refresh();
  //       if (res.status === 200) {
  //         localStorage.setItem("accessToken", res.data.accessToken);
  //         deleteUser();
  //       } else {
  //         navigate("/", { replace: true });
  //       }
  //     } else {
  //       props.setErr({ occured: true, msg: err.message });
  //     }
  //   }
  // };
  // useEffect(() => {
  //   //fetchUserData();
  // }, []);
  return (
    <>
      <div className="flex gap-[8px] items-center ml-[8px]">
        <h1
          className={
            (section === 1 ? "active " : "") +
            "cursor-pointer transition ease-in font-custom text-gray-300 hover:text-white"
          }
          onClick={() => {
            setSection(1);
          }}
        >
          {" "}
          Explore
        </h1>
        <h1
          className={
            (section === 2 ? "active " : "") +
            "cursor-pointer transition ease-in font-custom text-gray-300 hover:text-white"
          }
          onClick={() => {
            setSection(2);
          }}
        >
          All
        </h1>
      </div>
      <div className="flex justify-end align-center items-center">
        {loading ? (
          <Skeleton
            className="rounded-full w-12 h-12 cursor-pointer"
            onClick={() => {
              setMenu(!menu);
            }}
          />
        ) : (
          <img
            src={image}
            alt="Profile Picture"
            className="bg-[var(--primary-color)] rounded-full w-12 h-12 cursor-pointer"
            onClick={() => {
              setMenu(!menu);
            }}
          />
        )}

        {/* {props.isAdmin ? (
          <p
            className="link text-[var(--secondary-color)] mt-[5px] text-[1.2em]"
            onClick={() => setShowAdminPanel(true)}
          >
            Admin Panel
          </p>
        ) : (
          ""
        )} */}
      </div>
      {/*
      {showAdminPanel ? (
        <AdminPanel
          setShowAdminPanel={setShowAdminPanel}
          setErr={props.setErr}
        />
      ) : (
        ""
      )} */}
    </>
  );
};

export default NavBar;
