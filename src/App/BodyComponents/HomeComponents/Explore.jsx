import { useState, useContext } from "react";
import axios from "axios";
import Developers from "./ExploreComponents/Developers";
import { Context } from "../../Body";
import MusicList from "./ExploreComponents/MusicList";
import ErrorDialog from "../../../utils/ErrorDialog";
import ConfirmDialog from "../../../utils/ConfirmDialog";
import SuccessDialog from "../../../utils/SuccessDialog";
const Explore = () => {
  const {
    loadingA,
    loadingB,
    loadingC,
    recentMusic,
    topMusic,
    devData,
    play,
    audio,
  } = useContext(Context);
  /*
  const deleteMusic = async () => {
    if (props.isAdmin) {
      try {
        alert(id);
        setSuccess(false);
        const url = origin.default.origin + "/musicapi";
        const response = await axios.delete(
          url,
          { _id: id },
          { withCredentials: true }
        );
        if (response.status === 200) setSuccess(true);
      } catch (err) {
        props.setErr({ occured: true, msg: err.message });
      }
    }
  };*/
  return (
    <div className="overflow-auto overflow-x-hidden max-h-[85vh] w-[100%]">
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[8px] font-custom">
          <h1>Recently uploaded</h1>
        </header>
        <MusicList
          loading={loadingA}
          outputData={recentMusic}
          play={play}
          index={0}
          audio={audio}
          dbName="RecentMusicData"
        />
      </section>
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[8px] font-custom">
          <h1>Top Six</h1>
        </header>
        <MusicList
          loading={loadingB}
          outputData={topMusic}
          play={play}
          index={1}
          audio={audio}
          dbName="TopMusicData"
        />
      </section>
      <section>
        <header className="md:text-[1.5em] text-[1.2em] ml-[8px] font-custom">
          <h1>Developers</h1>
        </header>
        <Developers loading={loadingC} devData={devData} />
      </section>
    </div>
  );
};

export default Explore;
