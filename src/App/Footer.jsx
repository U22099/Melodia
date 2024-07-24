import { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from 'react-icons/fa6'
import { MdOutlineClose } from 'react-icons/md'
import ErrorDialog from '../utils/ErrorDialog'
import origin from '../../config/origin.json'
import axios from 'axios'

const Footer = (props) => {
    const [loaded, setLoaded] = useState();
    const [pause, setPause] = useState();
    const [src, setSrc] = useState("");
    const fetchMusicDataById = async (_id) => {
        try {
            const url = origin.default.origin + '/musicapi/data';
            const response = await axios.post(url, { "_id": _id },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setSrc(response.data.music.data);
        } catch (err) {
            props.setErr({ occured: true, msg: err.message });
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
        console.log("Called Load");
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
            slider.onchange = () => {
                audio.currentTime = slider.value;
                audio.play();
            }
            setInterval(() => {
                slider.value = audio.currentTime;
            }, 500);
        }
    }
    useEffect(() => {
        if (props.isPlaying) {
            setLoaded(false);
            fetchMusicDataById(props.file[props.x]._id);
        }
    }, [props.x]);
    useEffect(() => {
        setLoaded(true);
    }, [src]);
    useEffect(() => {
        Load();
    }, [loaded]);
    if (props.isPlaying) {
        if (loaded) {
            return (
                <div className="cursor-pointer p-[10px] rounded-[10px] flex gap-[20px] items-center">
                    <img src={props.file[props.x].image} alt="Music Picture" className="bg-[black] rounded-full w-24 h-24" />
                    <div className="w-[80%]">
                        <div className="flex justify-end p-[5px] pb-[0px] w-[100%]">
                            <MdOutlineClose className="fill-[var(--secondary-color)] cursor-pointer md:text-[2em]" onClick={() => props.setIsPlaying(false)} />
                        </div>
                        <h1 className="bold md:text-[2.2em] font-[serif]">{props.file[props.x].title}</h1>
                        <audio id="audio" hidden autoPlay>
                            <source src={src} key={props.file[props.x]._id} type="audio/mpeg" />
                        </audio>
                        <input type="range" name="range" id="range" min={0} defaultValue={0} className="w-[100%] bg-[var(--secondary-color)]" />
                        <div className="flex flex-wrap justify-between w-[70%] mx-auto">
                            <FaBackwardStep className="text-[2em] text-[var(--secondary-color)]" onClick={() => {
                                if (props.x <= 0) {
                                    props.setX(0);
                                } else {
                                    props.setX(props.x - 1);
                                }
                                Play();
                            }} />
                            {pause ? <FaPlay onClick={Play} className="text-[2em] text-[var(--secondary-color)]" /> : <FaPause onClick={Pause} className="text-[2em] text-[var(--secondary-color)]" />}
                            <FaForwardStep className="text-[2em] text-[var(--secondary-color)]" onClick={() => {
                                if (props.x >= props.file.length - 1) {
                                    props.setX(0);
                                } else {
                                    props.setX(props.x + 1);
                                }
                                Play();
                            }} />
                        </div>
                    </div>
                    {props.err.occured ? <ErrorDialog msg={props.err.msg} /> : ''}
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
