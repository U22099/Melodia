import React from 'react'

const Search = () => {
  return (
    <div>
        <section className="flex justify-center items-center relative">
    <input
      type="text"
      placeholder="Search..."
      id="input"
      className="input mx-auto md:w-[90%]"
      onChange={filterOutput}
    />
    <FaSearch
      className="fill-[var(--secondary-color)] cursor-pointer text-[1.7em] absolute left-[80%] md:left-[90%]"
      onClick={filterOutput}
      id="searchIcon"
    />
  </section>
  <section className="overflow-y-scroll h-[62vh] scrollbar p-[10px] pb-[20px] rounded-[10px] md:bg-[hsl(0,5%,2%)] md:w-[90%] mx-auto mb-[40px]">
        {loading ? (
          <div id="loader">
            <p></p>
          </div>
        ) : (
          <ol className="flex flex-col gap-[10px]">
            {outputData.map((x, i) => (
              <li
                key={i}
                onClick={() => {
                  const audio = document.getElementById("audio");
                  audio?.pause();
                  props.play(music, i);
                }}
              >
                <div className="cursor-pointer p-[10px] hover:bg-[var(--primary-color)] rounded-[10px] flex gap-[20px] items-center">
                  <img
                    src={x.image}
                    onDoubleClick={() => {
                      id = x._id;
                      console.log(id, x._id);
                      setConfirm(true);
                    }}
                    alt="Music Picture"
                    className="bg-[black] rounded-full w-24 h-24"
                  />
                  <div className="w-[80%]">
                    <h1 className="font-extrabold md:text-[2.2em] font-[serif]">
                      {x.title}
                    </h1>
                    <div className="flex flex-wrap justify-between text-[0.9em] md:text-[1.3em]">
                      <p>Artist: {x.artist}</p>
                      <p>Genre: {x.genre}</p>
                      <p>Uploaded by: {x.uploader}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
  </div>
  )
}

export default Search