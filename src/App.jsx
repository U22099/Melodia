import { useState, useEffect } from 'react'
import NavBar from './App/NavBar'
import Body from './App/Body'
import Footer from './App/Footer'

const App = () => {
  const [err, setErr] = useState({ occured: false, msg: "" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState();
  const [x, setX] = useState();
  const play = (file, x) => {
    setX(x);
    setFile(file);
    setIsPlaying(true);
  }
  return (
    <div className="grid gap-[20px] h-[100vh] my-[10px] w-[100vw]">
      <header className="grid grid-cols-[2fr_1fr] border-b-2 border-green-100 p-[10px]">
        <NavBar err={err} setErr={setErr} />
      </header>
      <main>
        <Body play={play} err={err} setErr={setErr} />
      </main>
      <footer className="bg-black rounded-[10px] fixed bottom-[0%] left-[50%] transfrom translate-x-[-50%] w-[100%] md:w-[90%]">
        <Footer file={file} isPlaying={isPlaying} setIsPlaying={setIsPlaying} x={x} setX={setX} err={err} setErr={setErr} />
      </footer>
    </div>
  )
}

export default App