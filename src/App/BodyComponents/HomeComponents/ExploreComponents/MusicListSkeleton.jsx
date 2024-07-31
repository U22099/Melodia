import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const MusicListSkeleton = ({outputData}) => {
  return (
    <section className="p-[10px] pb-[20px] ">
       <ol className="flex gap-[10px] overflow-auto overflow-y-hidden">
            {outputData.map((x, i) => (
              <li
                key={i}
                className="min-w-[150px]"
              >
                <div className="cursor-pointer p-[10px] rounded-[10px] flex flex-col gap-[5px] items-start">
                  <Skeleton
                    className="bg-[black] rounded-[15px] w-36 h-36 m-[0px]"
                  />
                  <div className="">
                    <h1 className="font-extrabold md:text-[1.3em] font-serif m-[0px ml-[5px]">
                      <Skeleton />
                    </h1>
                    <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-serif m-[0px ml-[5px]">
                        <Skeleton />
                    </h1>
                  </div>
                </div>
              </li>
            ))}
          </ol>
      </section>
  )
}

export default MusicListSkeleton