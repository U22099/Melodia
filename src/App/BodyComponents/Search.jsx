import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Context } from "../Body";
import MusicList from "../BodyComponents/HomeComponents/AllComponents/MusicList";

const Search = () => {
  const { loading, music } = useContext(Context);
  const [outputData, setOutputData] = useState([]);
  const filterOutput = (e = document.getElementById("input")) => {
    setOutputData(
      music.filter(
        (x) =>
          x.title.match(new RegExp(e.target.value, "i")) ||
          x.artist.match(new RegExp(e.target.value, "i")) ||
          x.uploader.match(new RegExp(e.target.value, "i"))
      )
    );
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
        type: "spring",
        delay: 0.5,
      }}
    >
      <section className="flex justify-center items-center mt-[32px] relative overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          id="input"
          className="input font-serif mx-auto md:w-[90%] rounded-[20p] mb-[16px]"
          onChange={filterOutput}
        />
        <FaSearch
          className="fill-gray-300 cursor-pointer text-[1.4em] md:text-[1.7em] absolute left-[80%] md:left-[90%]"
          id="searchIcon"
        />
      </section>
      <section className="max-h-[85vh] overflow-auto overflow-x-hidden">
        <MusicList loading={loading} outputData={outputData} />
      </section>
    </motion.div>
  );
};

export default Search;