import { useState, useEffect } from "react";
import SideBar from "./App/SideBar";
import NavBar from "./App/NavBar";
import Body from "./App/Body";
import Footer from "./App/Footer";

const App = () => {
  const [err, setErr] = useState({ occured: false, msg: "" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [file, setFile] = useState();
  const [page, setPage] = useState(1);
  const [x, setX] = useState();
  const play = (file, x) => {
    setX(x);
    setFile(file);
    setIsPlaying(true);
  };
  return (
    <div className="grid h-[100vh] w-[100vw] grid-cols-[1fr_5fr] md:grid-cols-[1fr_3fr]">
      <section className="bg-[var(--primary-color)] ">
        <SideBar setErr={setErr} err={err} setPage={setPage} page={page}/>
      </section>
      <section className="grid grid-rows-[1fr_8fr_0fr] gap-[20px] h-[100vh] mt-[0px] my-[10px] ">
        <header className="grid grid-cols-[2fr_1fr] p-[10px]">
          <NavBar
            err={err}
            setErr={setErr}
            setIsAdmin={setIsAdmin}
            isAdmin={isAdmin}
          />
        </header>
        <main className="overflow-hidden">
          <Body play={play} err={err} setErr={setErr} isAdmin={isAdmin} page={page}/>
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
