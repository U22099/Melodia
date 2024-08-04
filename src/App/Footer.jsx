import { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep, FaRepeat } from 'react-icons/fa6'
import {PiRepeatOnceBold} from 'react-icons/pi'
import { MdOutlineClose } from 'react-icons/md'
import fetchMusicDataById from '../utils/fetchMusicDataById.js'

const Footer = ({isPlaying, setIsPlaying,  file, x, setX, setErr}) => {
    const [text, setText] = useState();
    const [loaded, setLoaded] = useState(false);
    const [pause, setPause] = useState(false);
    const [src, setSrc] = useState("");
    let audio;
    const Play = () => {
        setPause(false);
        audio.play();
    }
    const Pause = () => {
        setPause(true);
        audio.pause();
    }
    const Load = () => {
        if(loaded){
            setPause(false);
            audio = new Audio(src);
            const slider = document.getElementById("range");
            const volume = document.getElementById("vol");
            slider.value = 0;
            volume.value = 75;
            audio.load();
            audio.addEventListener('loadedmetadata', () => {
                audio.loop = loop_one;
                audio.autoplay = true;
                audio.play();
                slider.max = audio.duration;
            });
            audio.addEventListener('ended', () => {
                if(loop_all){
                    if (x === file.length - 1) {
                        setX(0);
                    } else {
                        setX(x + 1);
                    }
                }
            });
            volume.onchange = () => {
                audio.volume = volume.value/100;
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
            fetchMusicDataById(file, x, file[x]._id, setSrc, setErr);
        }
    }, [x]);
    useEffect(() => {
        src ? setLoaded(true) : "";
    }, [src]);
    useEffect(() => {
        let interval = '';
        if(loaded){
            clearInterval(interval);
            Load();
        } else {
            let x = 0;
            interval = setInterval(()=>{
            const arr = ['.','..','...'];
            if(x === 3){
                setText('Loading');
                x = 0
            } else {
                setText('Loading'+arr[x]);
                x++;
            }
            }, 500);   
        }
    }, [loaded]);
    if (isPlaying) {
        if (loaded) {
            return (
                <div className="h-[120px] cursor-pointer p-[8px] ml-[-16px] flex gap-[16px] items-center fixed top-[100%] transform translate-y-[-100%] bg-[var(--primary-color)] w-[100%] flex justify-between items-center">
                    <img src={file[x].image} alt="Music Picture" className="bg-[black] rounded-lg w-24 h-24" />
                    <div className="w-[80%]">
                        
                        <h1 className={
                      (file[x].title?.length > 60 ? "truncate max-w-[85%] " : "") +
                      "font-extrabold md:text-[1.3em] font-custom m-[0px] ml-[8px]"
                    }
                    title={file[x].title}
                  >
                    {file[x].title}</h1>
                        <input type="range" name="range" id="range" min={0} defaultValue={0}/>
                        <div className="flex justify-start gap-[16px] items-center w-[85%]">
                            <FaRepeat className="text-[1.4em] text-[var(--secondary-color)]"/>
                            <FaBackwardStep className="text-[1.5em] text-[var(--secondary-color)]" onClick={() => {
                                if (x === 0) {
                                    setX(0);
                                } else {
                                    setX(x - 1);
                                }
                                Play();
                            }} />
                            {pause ? <FaPlay onClick={Play} className="text-[2em] p-[16px] rounded-full bg-[var(--secondary-color)]" /> : <FaPause onClick={Pause} className="text-[2em] p-[16px] rounded-full bg-[var(--secondary-color)]" />}
                            <FaForwardStep className="text-[1.5em] text-[var(--secondary-color)]" onClick={() => {
                                if (x === file.length - 1) {
                                    setX(0);
                                } else {
                                    setX(x + 1);
                                }
                                Play();
                            }} />
                            <PiRepeatOnceBold className="text-[1.4em] text-[var(--secondary-color)]"/>
                        </div>
                    </div>
                    <div className="flex flex-col h-[100%] gap-[8px]">
                    <div className="flex justify-end items-start p-[5px] pb-[0px] w-[100%]">
                            <MdOutlineClose className="fill-[var(--secondary-color)] cursor-pointer md:text-[2em]" onClick={() => setIsPlaying(false)} />
                        </div>
                        <div className="h-[100%] flex justify-start w-[100%] items-start">
                        <input type="range" name="range" id="vol" min={0} max={100} defaultValue={75}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="cursor-pointer p-[10px] rounded-[10px] flex justify-center items-center">
                    <h1 className="text-[var(--secondary-color)] text-[1.5em] font-serif">{text}</h1>
                </div>
            );
        }
    } else {
        return ""
    }
}

export default Footer
