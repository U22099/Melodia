import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import logOut from "../utils/logOut.js";
import ErrorDialog from "../utils/ErrorDialog.jsx";
import { motion } from "framer-motion";

const SideBar = ({key, page, setPage, setErr, err}) => {
  const navigate = useNavigate();
  const container = {
    hidden: { opacity: 1, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration: 1,
        delay: 0.5,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div 
    className="flex flex-col justify-between py-[20px] h-[100vh]">
      <motion.div key={key} variants={container} initial="hidden" animate="visible">
        <motion.header
        key={key}
          variants={item}
          className="cursor-pointer flex justify-center items-center md:justify-start md:p-[0px_20px] md:gap-[20px]"
        >
          <img
            src="Logo.jpg"
            alt="logo"
            className="w-[50px] h-[50px] rounded "
            onClick={() => {
              setPage(1);
            }}
          />
          <h1 className="font-bold font-serif text-[2em] text-[var(--secondary-color)] hidden md:flex">
            Melodia
          </h1>
        </motion.header>
        <motion.div
        key={key}
          variants={item}
          className="flex justify-center items-center md:justify-start md:p-[0px_20px] md:gap-[20px] mx-auto mt-[20px]"
        >
          <GoHomeFill
            className={
              (page === 1
                ? "fill-[var(--secondary-color)] "
                : "fill-gray-300 hover:fill-white ") +
              "cursor-pointer text-[1.5em] md:text-[2em] transition ease-in"
            }
            onClick={() => {
              setPage(1);
            }}
          />
          <h1
            className={
              (page === 1
                ? "text-[var(--secondary-color)]  "
                : "text-gray-300 hover:text-white ") +
              "cursor-pointer font-bold font-serif text-[1.2em] hidden md:flex transition ease-in"
            }
            onClick={() => {
              setPage(1);
            }}
          >
            Home
          </h1>
        </motion.div>
        <motion.div
        key={key}
          variants={item}
          className="flex justify-center items-center md:justify-start md:p-[0px_20px] md:gap-[20px] mx-auto mt-[20px] "
        >
          <FaSearch
            className={
              (page === 2
                ? "fill-[var(--secondary-color)] "
                : "fill-gray-300  hover:fill-white ") +
              "cursor-pointer text-[1.3em] md:text-[1.8em] transition ease-in"
            }
            onClick={() => {
              setPage(2);
            }}
          />
          <h1
            className={
              (page === 2
                ? "text-[var(--secondary-color)]  "
                : "text-gray-300 hover:text-white ") +
              "cursor-pointer font-bold font-serif text-[1.2em] hidden md:flex transition ease-in"
            }
            onClick={() => {
              setPage(2);
            }}
          >
            Search
          </h1>
        </motion.div>
        <motion.div
        key={key}
          variants={item}
          className="flex justify-center items-center md:justify-start md:p-[0px_20px] md:gap-[20px] mx-auto mt-[20px] "
        >
          <FaUser
            className={
              (page === 3
                ? "fill-[var(--secondary-color)] "
                : "fill-gray-300  hover:fill-white ") +
              "cursor-pointer text-[1.5em] md:text-[2em] transition ease-in"
            }
            onClick={() => {
              setPage(3);
            }}
          />
          <h1
            className={
              (page === 3
                ? "text-[var(--secondary-color)]  "
                : "text-gray-300 hover:text-white ") +
              "cursor-pointer font-bold font-serif text-[1.2em] hidden md:flex transition ease-in"
            }
            onClick={() => {
              setPage(3);
            }}
          >
            Profile
          </h1>
        </motion.div>
        <motion.div
        key={key}
          variants={item}
          className="flex justify-center items-center md:justify-start md:p-[0px_20px] md:gap-[20px] mx-auto mt-[20px] "
        >
          <LuUpload
            className={
              (page === 4
                ? "stroke-[var(--secondary-color)] "
                : "stroke-gray-300 hover:stoke-white ") +
              "cursor-pointer text-[1.5em] md:text-[2em] transition ease-in"
            }
            onClick={() => {
              setPage(4);
            }}
          />
          <h1
            className={
              (page === 4
                ? "text-[var(--secondary-color)]  "
                : "text-gray-300 hover:text-white ") +
              "cursor-pointer font-bold font-serif text-[1.2em]  hidden md:flex transition ease-in"
            }
            onClick={() => {
              setPage(4);
            }}
          >
            Upload
          </h1>
        </motion.div>
      </motion.div>
      <div>
        <motion.div
        key={key}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.5 }}
          className="flex justify-center items-center md:justify-start md:p-[0px_20px] md:gap-[20px] mx-auto mt-[20px]"
        >
          <MdLogout
            className="cursor-pointer text-[1.5em] md:text-[2em] fill-gray-300 hover:fill-white transition ease-in"
            onClick={() => logOut(setErr, navigate)}
          />
          <h1
            className="cursor-pointer bold font-serif text-[1.2em] text-gray-300 hover:text-white hidden md:flex transition ease-in"
            onClick={() => logOut(setErr, navigate)}
          >
            Logout
          </h1>
        </motion.div>
      </div>
      {err.occured ? <ErrorDialog msg={err.msg} /> : ""}
    </motion.div>
  );
};

export default SideBar;
