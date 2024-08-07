import { useState, useRef} from "react";
import { motion } from "framer-motion";
import uploadMusic from "../../utils/uploadMusic.js"


const Upload = ({setErr, username}) => {
  const [fileCount, setFileCount] = useState(0);
  const [upload, setUpload] = useState({ state: null, msg: "" });
  const fileRef = useRef();
  
  const uploadFile = async () => {
    await uploadMusic(setUpload, fileRef, username, setFileCount, setErr);
  }
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
      className="mt-[50px] md:w-[70%] mx-auto"
    >
      <div className="flex cursor-pointer flex-col">
        <h1 className="font-bold font-custom ml-[10px] md:text-[1.5em]">Upload Music: </h1>
        <label htmlFor="upload" className="cursor-pointer mt-[20px]">
          <input
            ref={fileRef}
            type="file"
            accept=".mp3"
            id="upload"
            className="hidden"
            onChange={(e) => setFileCount(e.target.files.length)}
            multiple
          />
          <div
            className={
              (upload.state === false ? "glow " : "") +
              "grid grid-cols-[4fr_1fr] border-[2px] border-white border-dashed text-[1.2em] font-bold rounded-[10px] p-[8px] w-[80%] md:w-[70%] mx-auto"
            }
          >
            <h1>Upload</h1>
            <p className="text-[var(--secondary-color)] bold">{fileCount}</p>
          </div>
        </label>
        <button className="btn bg-none font-extrabold mt-[20px] w-[80%] md:w-[70%] h-[50px]" onClick={uploadFile}>
          Upload
        </button>
        <p>STILL IN DEV MODE!!</p>
      </div>
    </motion.div>
  );
};

export default Upload;
