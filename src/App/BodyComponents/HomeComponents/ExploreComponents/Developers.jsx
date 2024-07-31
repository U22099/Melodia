import React from 'react'
import DevelopersSkeleton from "./DevelopersSkeleton";

const Developers = ({loading, devData}) => {
  return (
    <section className="p-[10px] pb-[20px] ">
        {loading ? (
          <DevelopersSkeleton devData={[0,1]}/>
        ) : (
          <ol className="flex gap-[10px] overflow-auto overflow-y-hidden">
            {devData.map((x, i) => (
              <li
                key={i}
                onClick={() => {
                  // const audio = document.getElementById("audio");
                  // audio?.pause();
                  // props.play(music, i);
                }}
                className="min-w-[250px]"
              >
                <div className="cursor-pointer p-[10px] rounded-[10px] flex  gap-[5px] items-center justify-center">
                  <img
                    src={x.image}
                    onDoubleClick={() => {
                      // id = x._id;
                      // console.log(id, x._id);
                      // setConfirm(true);
                    }}
                    alt="Music Picture"
                    className="bg-[black] rounded-full w-36 h-36 m-[0px]"
                  />
                  <div className="flex flex-col justify-center items-start flex-wrap w-[100%]">
                    <h1 className="font-extrabold md:text-[1.3em] font-serif m-[0px ml-[5px]">
                      {x.username}
                    </h1>
                    <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-serif m-[0px ml-[5px]">
                      {x.role}
                    </h1>
                    <a href={`mailto:${x.email}`} className="text-black text-[0.8em] md:text-[1em] font-serif m-[0px] ml-[5px] bg-[var(--secondary-color)] rounded p-[10px] mt-[20px]">
                      Contact
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          )}
      </section>
  )
}

export default Developers