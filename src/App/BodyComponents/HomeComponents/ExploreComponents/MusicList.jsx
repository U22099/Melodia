import React from 'react'
import MusicListSkeleton from "./MusicListSkeleton";

const MusicList = ({loading, outputData}) => {
  return (
    <section className="p-[10px] pb-[20px] ">
        {loading ? (
          <MusicListSkeleton outputData={[0,1,2,3,4,5]}/>
        ) : (
          <ol className="flex gap-[10px] overflow-auto overflow-y-hidden">
            {outputData.map((x, i) => (
              <li
                key={i}
                onClick={() => {
                  // const audio = document.getElementById("audio");
                  // audio?.pause();
                  // play(music, i);
                }}
                className="min-w-[150px]"
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
                    <h1 className="font-extrabold md:text-[1.3em] font-serif m-[0px ml-[5px]">
                      {x.title}
                    </h1>
                    <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-serif m-[0px ml-[5px]">
                      Uploaded by {x.uploader}
                    </h1>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          )}
      </section>
  )
}

export default MusicList