import React, { useState, useEffect } from "react";
import SideBar from "./App/SideBar";
import Body from "./App/Body";
import Footer from "./App/Footer";
import { motion } from "framer-motion";

export const Context = React.createContext();

const App = () => {
  const [err, setErr] = useState({ occured: false, msg: "" });
  const [isAdmin, setIsAdmin] = useState();
  const [menu, setMenu] = useState(false);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(1);
  useEffect(()=>{
    function reset(){
    const id = JSON.parse(localStorage.getItem('_id'))?.id
     return !id || id === ""
    }
        const refreshToken = localStorage.getItem('refreshToken');
        if(!refreshToken || reset()) navigate('/', { replace: true });
    }, [])
  return (
    <div
      className={
        (menu ? "grid-cols-[1fr_5fr] " : "") +
        "grid h-[100vh] w-[100vw] md:grid-cols-[1fr_3fr]"
      }
    >
      <motion.section
        key={menu}
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
        }}
        className={
          (menu ? "" : "hidden ") + "md:block md:bg-[var(--primary-color)] "
        }
      >
        <SideBar
          key={menu}
          setErr={setErr}
          err={err}
          setPage={setPage}
          isAdmin={isAdmin}
          page={page}
        />
      </motion.section>
      <section className="flex flex-col overflow-hidden gap-[20px] h-[100vh] mt-[0px] my-[10px] ">
        <main className="">
          <Context.Provider value={{ section, setSection, setMenu, menu }}>
            <Body
              err={err}
              setErr={setErr}
              isAdmin={isAdmin}
              page={page}
            />
          </Context.Provider>
        </main>
      </section>
    </div>
  );
};


export default App;
