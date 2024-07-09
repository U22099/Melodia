import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useState } from 'react'

function SuccessDialog(props) {
    const [show, setShow] = useState(true)
    if (show) {
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
                className="flex flex-col bg-black rounded-xl p-[20px] dialog md:w-[40vw] w-[90vw] justify-center items-center gap-[10px]">
                <div className="w-[100%] flex justify-center items-center">
                    <IoCheckmarkDoneSharp className="text-green-600 text-bold text-[5em]" />
                </div>
                <h1 className="text-[2.5em] text-white display flex w-[100%] justify-center items-center">Done</h1>
                <div className=" w-[80%] text-center text-white items-center text-[1.3em]">
                    <p>{props.msg}</p>
                </div>
                <button className="w-[80%] bg-green-600 rounded-md text-[2em] shadow-[2px_2px_5px_3px_rgba(0,0,0,0.5)]" onClick={() => { setShow(false) }}>OK</button>
            </motion.div>
        )
    } else { return '' }
}

export default SuccessDialog