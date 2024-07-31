import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DevelopersSkeleton = ({devData}) => {
  return (
    <section className="p-[10px] pb-[20px] ">
        <ol className="flex gap-[10px] overflow-auto overflow-y-hidden">
            {devData.map((x, i) => (
              <li
                key={i}
                className="min-w-[250px]"
              >
                <div className="cursor-pointer p-[10px] rounded-[10px] flex  gap-[5px] items-center justify-center">
                  <Skeleton
                    className="bg-[black] rounded-full w-36 h-36 m-[0px]"
                  />
                  <div className="flex flex-col justify-center items-start flex-wrap w-[100%]">
                    <h1 className="font-extrabold md:text-[1.3em] font-serif m-[0px ml-[5px]">
                      <Skeleton />
                    </h1>
                    <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-serif m-[0px ml-[5px]">
                      <Skeleton />
                    </h1>
                    <a className="text-black text-[0.8em] md:text-[1em] font-serif m-[0px] ml-[5px] bg-[var(--secondary-color)] rounded p-[10px] mt-[20px]">
                      <Skeleton />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
      </section>
  )
}

export default DevelopersSkeleton