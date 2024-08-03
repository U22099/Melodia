import { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from 'react-icons/fa6'
import { MdOutlineClose } from 'react-icons/md'
import indexedDB from '../utils/indexedDB.js'
import ErrorDialog from '../utils/ErrorDialog'
import origin from '../../config/origin.json'
import axios from 'axios'

const Footer = ({isPlaying, file, x, setX, setErr}) => {
    const [loaded, setLoaded] = useState();
    const [pause, setPause] = useState();
    const [src, setSrc] = useState();
    const fetchMusicDataById = async (_id, setSrc, setErr) => {
        try {
            if(!file[x].data){
                const url = origin.default.origin + '/musicapi/data';
                const response = await axios.post(url, { "_id": _id },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                file[x].data = response.data.music.data;
                indexedDB.saveData(file, "MusicData", indexedDB.init);
                localStorage.setItem('music_stored', true);
                setSrc(response.data.music.data);
            } else {
                setSrc(file[x].data);
            }
        } catch (err) {
            setErr({ occured: true, msg: err.message });
        }
    }
    const Play = () => {
        setPause(false);
        const audio = document.getElementById("audio");
        audio.play();
    }
    const Pause = () => {
        setPause(true);
        const audio = document.getElementById("audio");
        audio.pause();
    }
    const Load = () => {
        if(loaded){
            setPause(false);
            const audio = document.getElementById("audio");
            const slider = document.getElementById("range");
            audio.src = src;
            audio.load();
            audio.play();
            slider.value = 0;
            audio.addEventListener('loadedmetadata', () => {
                slider.max = audio.duration;
            });
            audio.onend = () => {
                alert("Replay");
                Load()
            }
            slider.onchange = () => {
                audio.currentTime = slider.value;
                audio.play();
            }
            setInterval(() => {
                slider.value = audio.currentTime;
            }, 100);
        }
    }
    useEffect(() => {
        if (isPlaying) {
            setLoaded(false);
            fetchMusicDataById(file[x]._id);
        }
    }, [x]);
    useEffect(() => {
        src ? setLoaded(true) : "";
    }, [src]);
    useEffect(() => {
        if(loaded){
            Load();
        }
    }, [loaded]);
    if (isPlaying) {
        if (loaded) {
            return (
                <div className="cursor-pointer p-[8px] rounded-[8px] flex gap-[16px] items-center">
                    <img src={file[x].image} alt="Music Picture" className="bg-[black] rounded w-24 h-24" />
                    <div className="w-[80%]">
                        <div className="flex justify-end p-[5px] pb-[0px] w-[100%]">
                            <MdOutlineClose className="fill-[var(--secondary-color)] cursor-pointer md:text-[2em]" onClick={() => setIsPlaying(false)} />
                        </div>
                        <h1 className={
                      (x.title?.length > 20 ? "truncate max-w-[144px] " : "") +
                      "font-extrabold md:text-[1.3em] font-custom m-[0px] ml-[8px]"
                    }
                    title={x.title}
                  >
                    {x.title}</h1>
                        <audio id="audio" hidden autoPlay>
                            <source src={src} key={file[x]._id} type="audio/mpeg" />
                        </audio>
                        <input type="range" name="range" id="range" min={0} defaultValue={0} className="w-[100%] bg-[var(--secondary-color)]" />
                        <div className="flex flex-wrap justify-between w-[70%] mx-auto">
                            <FaBackwardStep className="text-[2em] text-[var(--secondary-color)]" onClick={() => {
                                if (x === 0) {
                                    setX(0);
                                } else {
                                    setX(x - 1);
                                }
                                Play();
                            }} />
                            {pause ? <FaPlay onClick={Play} className="text-[2em] text-[var(--secondary-color)]" /> : <FaPause onClick={Pause} className="text-[2em] text-[var(--secondary-color)]" />}
                            <FaForwardStep className="text-[2em] text-[var(--secondary-color)]" onClick={() => {
                                if (x === file.length - 1) {
                                    setX(0);
                                } else {
                                    setX(x + 1);
                                }
                                Play();
                            }} />
                        </div>
                    </div>
                    {err.occured ? <ErrorDialog msg={err.msg} /> : ''}
                </div>
            )
        } else {
            return (
                <div className="cursor-pointer p-[10px] rounded-[10px] flex justify-center items-center">
                    <p id="roll2"></p>
                </div>
            );
        }
    } else {
        return ""
    }
}

export default Footer
