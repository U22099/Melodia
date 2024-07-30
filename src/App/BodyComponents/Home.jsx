import {useContext} from 'react'
import NavBar from '../NavBar.jsx'
import Explore from './HomeComponents/Explore.jsx'
import All from './HomeComponents/All.jsx'
import {motion} from 'framer-motion'
import {Context} from '../../App.jsx'


const Home = () => {
  const [section, setSection] = useContext(Context);
  return (
    <div className="">
      <header className="grid grid-cols-[2fr_1fr] p-[10px]">
          <NavBar
            setSection={setSection}
            section={section}
          />
      </header>
      <motion.main
        initial={{
            opacity: 0,
            y: 100
        }}
        animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              duration: 1,
            }
        }}
         key={section}
        >
        {section === 1 ? <Explore/> : ''}
        {section === 2 ? <All/> : ''}
      </motion.main>
    </div>
  );
};

export default Home
