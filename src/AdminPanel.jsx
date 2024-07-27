import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineClose, MdRefresh } from 'react-icons/md'

function AdminPanel(props) {
    const [spinning, setSpinning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(false);
    const [musicCount, setMusicCount] = useState(false);
    const fetchAdminData = async () => {
        setLoading(true);
        const stored = JSON.parse(localStorage.getItem('store3'));
        if(stored && !forceRefresh){
            const data = await indexedDB.getData("AdminData", indexedDB.init);
            setUsers(data.users);
            setMusicCount(data.musicCount);
            setForceRefresh(true);
            setLoading(false);
        } else {
            try {
                const url = origin.default.origin + '/user/admin';
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(url, {
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                indexedDB.saveData(response.data, "AdminData", indexedDB.init);
                localStorage.setItem('store3', true);
                setUsers(response.data.users);
                setMusicCount(response.data.musicCount);
                setLoading(false);
        
            } catch (err) {
                console.log(err);
                props.setErr({ occured: true, msg: err.message });
                if ([401, 403].includes(err.response.status)) {
                    const res = await refresh();
                    if (res.status === 200) {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        fetchUserData();
                    } else {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        navigate('/', { replace: true });
                    }
                }
                if(err.message.includes("Network")){
                    fetchUserData();
                }
            }
        }
    }
    const refresh = async () => {
        try {
            const url = origin.default.origin + '/refresh';
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post(url, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + refreshToken
                }
            });
            if (response.status === 200) return response
        } catch (err) {
            if ((err.response.status === 403) || (err.response.status === 401)) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate('/', { replace: true });
            }
        }
    }
    const refreshState = () => {
        setSpinning(true);
        fetchAdminData();
        setTimeout(() => {
            setSpinning(false);
        }, 1000)
    }
    useEffect(()=>{
        fetchAdminData()
    },[])
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.5,
                }
            }}
            className="flex flex-col bg-black rounded-xl p-[20px] dialog md:w-[60vw] w-[95vw] justify-start items-start gap-[10px] h-[80vh] overflow-y-scroll overflow-x-hidden scrollbar py-[10px]">
            <div className="flex gap-[10px] justify-end p-[5px] pb-[0px] w-[100%]">
                <MdRefresh className={(spinning ? "animate-spin-once " : "") + "cursor-pointer text-[2.6em] fill-[var(--secondary-color)]"} onClick={refreshState} />
                <MdOutlineClose className="fill-[var(--secondary-color)] cursor-pointer text-[2.6em]" onClick={() => props.setShowAdminPanel(false)} />
            </div>
            <section>
                <header>Users' data: </header>
                <main>
                    {loading ? <div id="loader"><p></p></div> :
                    <ol className="flex flex-col gap-[10px]">
                        {users.sort((a, b) => a.username.localeCompare(b.username)).map((x, i) => (
                            <li key={i}>
                                <div className="cursor-pointer p-[10px] rounded-[10px] flex gap-[20px] items-center">
                                    <img src={x.image} alt="Music Picture" className="bg-[black] rounded-full w-24 h-24" />
                                    <div className="max-w-[80%] truncate">
                                        <h1 className="text-[1.8em] bold md:text-[2.2em] font-[serif] max-w-[220px] truncate md:max-w-[350px]">{x.username}</h1>
                                        <p className="max-w-[220px] truncate md:max-w-[350px]">Email: {x.email}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol> }
                </main>
            </section>
            <section className="mx-auto">
                <header>
                    Current Music Count: {musicCount}
                </header>
            </section>
        </motion.div>
    )
}

export default AdminPanel
