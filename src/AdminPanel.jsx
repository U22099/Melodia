import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineClose, MdRefresh } from 'react-icons/md'

function AdminPanel(props) {
    const [spinning, setSpinning] = useState(false);
    const refreshState = () => {
        setSpinning(true);
        props.refresh();
        setTimeout(() => {
            setSpinning(false);
        }, 1000)
    }
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
                    <ol className="flex flex-col gap-[10px]">
                        {props.users.sort((a, b) => a.username.localeCompare(b.username)).map((x, i) => (
                            <li key={i}>
                                <div className="cursor-pointer p-[10px] rounded-[10px] flex gap-[20px] items-center">
                                    <img src={x.image} alt="Music Picture" className="bg-[black] rounded-full w-24 h-24" />
                                    <div className="max-w-[80%] truncate">
                                        <h1 className="text-[1.8em] bold md:text-[2.2em] font-[serif] max-w-[250px] truncate md:max-w-[350px]">{x.username}</h1>
                                        <p>Email: {x.email}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </main>
            </section>
            <section className="mx-auto">
                <header>
                    Current Music Count: {props.music_count}
                </header>
            </section>
        </motion.div>
    )
}

export default AdminPanel
