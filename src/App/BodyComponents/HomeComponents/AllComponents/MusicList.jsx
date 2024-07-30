import React from 'react'

const MusicList = (props) => {
  return (
    <section className="p-[10px] pb-[20px] mx-auto">
        {props.loading ? (
          <div id="loader">
            <p></p>
          </div>
        ) : (
          <ol className="flex md:gap-[5px] flex-wrap justify-center">
            {props.outputData.map((x, i) => (
              <li
                key={i}
                onClick={() => {
                  // const audio = document.getElementById("audio");
                  // audio?.pause();
                  // props.play(music, i);
                }}
                className="min-w-[140px] md:min-w-[150px] max-w-[140px] md:max-w-[150px]"
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