import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toBase64 from "../../utils/Base64.js";
import { Context } from "../Body.jsx";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const [text, setText] = useState("Save");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const {
    loading,
    setLoading,
    image,
    setImage,
    email,
    setEmail,
    username,
    setUsername,
    updateUserData,
    setConfirm
  } = useContext(Context);
  const handleImage = async (e) => {
    const data = await toBase64(e.target.files[0]);
    setImage(data);
  };
  const update = async () => {
    await updateUserData(
      navigate,
      username,
      email,
      image,
      setText,
      text,
      setErrorText,
      setLoading
    );
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        type: "spring",
        delay: 0.5,
      }}
      className="grid grid-rows-[3fr_repeat(3,1fr)] gap-[10px] p-[20px] rounded-[10px] text-center items-center w-[100%] md:w-[70%] mx-auto"
    >
      {loading ? (
        <Skeleton className="bg-[var(--primary-color)] rounded-full md:w-48 md:h-48 w-40 h-40 mx-auto" />
      ) : (
        <label htmlFor="inputImage">
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="inputImage"
            className="hidden"
            onChange={handleImage}
          />
          <img
            src={image}
            alt="Profile Picture"
            className="bg-[var(--primary-color)] rounded-full md:w-48 md:h-48 w-40 h-40 mx-auto"
          />
        </label>
      )}
      <div>
        <input
          type="text"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-[var(--primary-color)] rounded-[5px] p-[8px_10px] mx-auto text-[1.3em] text-[white] w-[82%] md:w-[70%]"
        />
      </div>
      <div>
        <input
          type="text"
          defaultValue={email}
          onChange={(e) => setEmail(target.value)}
          className="bg-[var(--primary-color)] rounded-[5px] p-[8px_10px] mx-auto text-[1.3em] text-[white] w-[82%] md:w-[70%]"
        />
        <p
          className={
            errorText === "" ? "hidden" : "text-[0.8em] font-bold text-red-600"
          }
        >
          {errorText}
        </p>
      </div>
      <button
        onClick={update}
        className="btn w-[82%] md:w-[70%] font-custom h-[50px]"
      >
        {text}
      </button>
      <button
        className="btn font-custom h-[50px] w-[82%] md:w-[70%] bg-red-600"
        onClick={() => {
          setConfirm({ask: true, result: false});
        }}
      >
        Delete my account
      </button>
    </motion.div>
  );
};

export default Profile;
