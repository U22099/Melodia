import React, { useState, useEffect } from "react";
import SideBar from "./App/SideBar";
import Body from "./App/Body";
import Footer from "./App/Footer";
import {motion} from 'framer-motion'

export const Context = React.createContext();

const App = () => {
  const [err, setErr] = useState({ occured: false, msg: "" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [file, setFile] = useState();
  const [menu, setMenu] = useState(false);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(1);
  const [x, setX] = useState();
  const play = (file, x) => {
    setX(x);
    setFile(file);
    setIsPlaying(true);
  };
  return (
    <div className={(menu ? "grid-cols-[1fr_5fr] " : "") +"grid h-[100vh] w-[100vw] md:grid-cols-[1fr_3fr]"}>
      <motion.section 
      key={menu}
    initial={{ x: -50}}
    animate={{ x: 0}}
    transition={{
        type: "spring"
    }}
      className={(menu ? "" : "hidden ") +  "bg-[var(--primary-color)] "}>
        <SideBar key={menu} setErr={setErr} err={err} setPage={setPage} page={page} />
      </motion.section>
      <section className="flex flex-col overflow-hidden gap-[20px] h-[100vh] mt-[0px] my-[10px] ">
        <main className="">
          <Context.Provider value={[section, setSection, setMenu, menu]}>
            <Body
              play={play}
              err={err}
              setErr={setErr}
              isAdmin={isAdmin}
              page={page}
            />
          </Context.Provider>
        </main>
        <footer className="bg-black rounded-[10px] fixed bottom-[0%] left-[50%] transfrom translate-x-[-50%] w-[100%] md:w-[90%]">
          <Footer
            file={file}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            x={x}
            setX={setX}
            err={err}
            setErr={setErr}
          />
        </footer>
      </section>
    </div>
  );
};

export default App;
