import React from "react";
import MusicListSkeleton from "./MusicListSkeleton";

const MusicList = ({ loading, outputData }) => {
  return (
    <section className="p-[8px] pl-[0px] w-[100%] mx-auto">
      {loading ? (
        <MusicListSkeleton outputData={"012345678910".split("")} />
      ) : (
        <ol className="flex md:gap-[5px] flex-wrap justify-center w-[100%] mx-auto">
          {outputData.map((x, i) => (
            <li
              key={i}
              onClick={() => {
                // const audio = document.getElementById("audio");
                // audio?.pause();
                // props.play(music, i);
              }}
              className="min-w-[120px] md:min-w-[150px] max-w-[150px] md:max-w-[200px]"
            >
              <div className="cursor-pointer p-[10px] rounded-[10px] flex flex-col gap-[5px] items-start">
                <img
                  src={x.image}
                  onDoubleClick={() => {
                    // id = x._id;
                    // console.log(id, x._id);
                    // setConfirm(true);
                  }}
                  alt="Music Picture"
                  className="bg-[black] rounded-[15px] w-36 h-36 m-[0px]"
                />
                <div className="">
                  <h1
                    className={
                      (x.title.length > 20 ? "truncate max-w-[200px] " : "") +
                      "font-extrabold md:text-[1.3em] font-custom m-[0px] ml-[8px]"
                    }
                    title={x.title}
                  >
                    {x.title}
                  </h1>
                  <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-custom m-[0px] ml-[8px] ">
                    Uploaded by {x.uploader}
                  </h1>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default MusicList;
