import { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForwardStep,
  FaBackwardStep,
  FaRepeat,
} from "react-icons/fa6";
import { PiRepeatOnceBold } from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";
import fetchMusicDataById from "../utils/fetchMusicDataById.js";

const Footer = ({ isPlaying, setIsPlaying, file, x, setX, setErr }) => {
  const [text, setText] = useState();
  const [audio, setAudio] = useState();
  const [loop_all, setLoop_all] = useState(false);
  const [loop_one, setLoop_one] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pause, setPause] = useState(false);
  const [src, setSrc] = useState("");
  let audio;
  const Play = () => {
    setPause(false);
    audio.play();
  };
  const Pause = () => {
    setPause(true);
    audio.pause();
  };
  const Load = () => {
    if (loaded) {
      setPause(false);
      audio = new Audio(src);
      const slider = document.getElementById("range");
      const volume = document.getElementById("vol");
      slider.value = 0;
      volume.value = 75;
      audio.load();
      audio.addEventListener("loadedmetadata", () => {
        audio.loop = loop_one;
        audio.autoplay = true;
        audio.play();
        slider.max = audio.duration;
      });
      audio.addEventListener("ended", () => {
        console.log("Ended");
        if (loop_all) {
          if (x === file.length - 1) {
            setX(0);
          } else {
            setX(x + 1);
          }
        } else if(loop_one){
          setX(x);
        }
      });
      volume.onchange = () => {
        audio.volume = volume.value / 100;
      };
      slider.onchange = () => {
        audio.currentTime = slider.value;
        audio.play();
      };
      setInterval(() => {
        slider.value = audio.currentTime;
      }, 100);
    setAudio(audio);
    }
  };
  useEffect(() => {
    if (isPlaying) {
      setLoaded(false);
      fetchMusicDataById(file, x, file[x]._id, setSrc, setErr);
    }
  }, [x]);
  useEffect(() => {
    src ? setLoaded(true) : "";
  }, [src]);
  useEffect(() => {
    let interval = "";
    if (loaded) {
      clearInterval(interval);
      Load();
    } else {
      let x = 0;
      interval = setInterval(() => {
        const arr = [".", "..", "..."];
        if (x === 3) {
          setText("Loading");
          x = 0;
        } else {
          setText("Loading" + arr[x]);
          x++;
        }
      }, 500);
    }
  }, [loaded]);
  if (isPlaying) {
    if (loaded) {
      return (
        <div className="h-[120px] cursor-pointer p-[8px] ml-[-16px] gap-[16px] fixed top-[100%] transform translate-y-[-100%] bg-[var(--primary-color)] w-[100%] flex justify-between items-center">
          <img
            src={file[x].image}
            alt="Music Picture"
            className="bg-[black] rounded-lg w-16 h-16 md:w-24 md:h-24"
          />
          <div className="w-[80%] flex flex-col items-center gap-[8px] mx-auto">
            <h1
              className="max-w-[230px] md:max-w-[350px] truncate font-extrabold md:text-[1.3em] font-custom m-[0px] ml-[8px]"
              title={file[x].title}
            >
              {file[x].title}
            </h1>
            <input
              type="range"
              name="range"
              id="range"
              min={0}
              defaultValue={0}
            />
            <div className="flex justify-center gap-[16px] items-center w-[85%]">
              <FaRepeat className={(loop_all ? "fill-[var(--secondary-color)] " : "") + "text-[1.3em]"} onClick={()=> {setLoop_all(!loop_all); setLoop_one(false);}}/>
              <FaBackwardStep
                className="text-[1.5em] active:fill-[var(--secondary-color)]"
                onClick={() => {
                  if (x === 0) {
                    setX(0);
                  } else {
                    setX(x - 1);
                  }
                  Play();
                }}
              />
              {pause ? (
                <FaPlay
                  onClick={Play}
                  className="text-[2.5em] text-white p-[8px] rounded-full bg-[var(--secondary-color)]"
                />
              ) : (
                <FaPause
                  onClick={Pause}
                  className="text-[2.5em] text-white p-[8px] rounded-full bg-[var(--secondary-color)]"
                />
              )}
              <FaForwardStep
                className="text-[1.5em] active:fill-[var(--secondary-color)]"
                onClick={() => {
                  if (x === file.length - 1) {
                    setX(0);
                  } else {
                    setX(x + 1);
                  }
                  Play();
                }}
              />
              <PiRepeatOnceBold className={(loop_one ? "fill-[var(--secondary-color)] " : "") + "text-[1.3em]"} onClick={()=> {setLoop_one(!loop_one); setLoop_all(false);}} />
              <div className="hidden md:flex h-[100%] justify-start items-start">
                <input
                  type="range"
                  name="range"
                  id="vol"
                  min={0}
                  max={100}
                  defaultValue={75}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col h-[100%] gap-[8px]">
            <div className="flex justify-end items-start p-[5px] pb-[0px] w-[100%]">
              <MdOutlineClose
                className="text-[1.3em] fill-[var(--secondary-color)] cursor-pointer md:text-[2em]"
                onClick={() => setIsPlaying(false)}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-[120px] cursor-pointer p-[8px] ml-[-16px] gap-[16px] fixed top-[100%] transform translate-y-[-100%] bg-[var(--primary-color)] w-[100%] flex justify-between items-center">
          <h1 className="text-[var(--secondary-color)] text-[1.5em] font-serif">
            {text}
          </h1>
        </div>
      );
    }
  } else {
    return "";
  }
};

export default Footer;
