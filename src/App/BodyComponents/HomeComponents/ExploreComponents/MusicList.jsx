import React from "react";
import MusicListSkeleton from "./MusicListSkeleton";

const MusicList = ({ loading, outputData, play }) => {
  return (
    <section className="p-[8px] pl-[0px] ">
      {loading ? (
        <MusicListSkeleton outputData={outputData} />
      ) : (
        <ol className="flex gap-[8px] overflow-auto overflow-y-hidden">
          {outputData.map((x, i) => (
            <li
              key={i}
              onClick={() => {
                const audio = document.getElementById("audio");
                audio?.pause();
                play(outputData, i);
              }}
              className="min-w-[150px]"
            >
              <div className="cursor-pointer p-[8px] rounded-[10px] flex flex-col gap-[8px] items-start">
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
                      (x.title?.length > 20 ? "truncate max-w-[144px] " : "") +
                      "font-extrabold md:text-[1.3em] font-custom m-[0px] ml-[8px]"
                    }
                    title={x.title}
                  >
                    {x.title}
                  </h1>
                  <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-custom m-[0px] ml-[8px]">
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
