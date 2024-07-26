import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdRefresh, MdOutlineClose } from 'react-icons/md'
import axios from 'axios'
import ErrorDialog from '../utils/ErrorDialog'
import ConfirmDialog from '../utils/ConfirmDialog'
import origin from '../../config/origin.json'

const Body = (props) => {
    const [refresh, setRefresh] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [music, setMusic] = useState([]);
    const [outputData, setOutputData] = useState(music.slice());
    const filterOutput = () => {
        const input = document.getElementById('input').value;

        setOutputData(music.filter(x => x.title.match(new RegExp(input, 'i')) || x.artist.match(new RegExp(input, 'i'))));
    }
    const refreshState = () => {
        setSpinning(true);
        setRefresh(!refresh);
    }
    const fetchMusic = async () => {
        try {
            setOutputData([]);
            const url = origin.default.origin + '/musicapi';
            const response = await axios.get(url, { withCredentials: true });
            setMusic(response.data.music.sort((a, b) => a.title.localeCompare(b.title)));
            console.log(response.data.music);
        } catch (err) {
            props.setErr({ occured: true, msg: err.message });
        }
    }
    const deleteMusic = async (_id) => {
        if(props.isAdmin){
            const url = origin.default.origin + '/musicapi';
            const response = await axios.delete(url,{_id: _id}, { withCredentials: true });
            if(response.status === 200) console.log("Success");
        }
    }
    useEffect(() => {
        setOutputData(music.slice());
        filterOutput();
        setTimeout(() => {
            setSpinning(false);
        }, 1000)
    }, [music]);
    useEffect(() => {
        fetchMusic();
    }, [refresh])
    return (
        <>
            <section className="flex justify-center items-center relative">
                <input type="text" placeholder="Search..." id="input" className="input mx-auto md:w-[90%]" onChange={filterOutput} />
                <FaSearch className="fill-[var(--secondary-color)] cursor-pointer text-[1.7em] absolute left-[80%] md:left-[90%]" onClick={filterOutput} id="searchIcon" />
            </section>
            <section className="flex justify-end p-[10px] pb-[0px] md:w-[90%] mx-auto">
                <MdRefresh className={(spinning ? "animate-spin-once " : "") + "cursor-pointer text-[2.6em] fill-[var(--secondary-color)] bg-[hsl(0,5%,2%)] p-[10px] rounded-[10px]  mt-[15px] mb-[5px]"} onClick={refreshState} />
            </section>
            <section className="overflow-y-scroll h-[62vh] scrollbar p-[10px] pb-[20px] rounded-[10px] md:bg-[hsl(0,5%,2%)] md:w-[90%] mx-auto mb-[40px]">
                <ol className="flex flex-col gap-[10px]">
                    {outputData.map((x, i) => (
                        <li key={i} onMouseDown={() => deleteMusic(x._id)} onMouseUp={clearTimeout} onClick={() => {
                            const audio = document.getElementById("audio");
                            audio?.pause();
                            props.play(music, i);
                        }}>
                            <div className="cursor-pointer p-[10px] hover:bg-[var(--primary-color)] rounded-[10px] flex gap-[20px] items-center">
                                <img src={x.image} alt="Music Picture" className="bg-[black] rounded-full w-24 h-24" />
                                <div className="w-[80%]">
                                    <h1 className="font-extrabold md:text-[2.2em] font-[serif]">{x.title}</h1>
                                    <div className="flex flex-wrap justify-between text-[0.9em] md:text-[1.3em]">
                                        <p>Artist: {x.artist}</p>
                                        <p>Genre: {x.genre}</p>
                                        <p>Uploaded by: {x.uploader}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>
            {props.err.occured ? <ErrorDialog msg={props.err.msg} setErr={props.setErr} /> : ''}
        </>
    )
}

export default Body
