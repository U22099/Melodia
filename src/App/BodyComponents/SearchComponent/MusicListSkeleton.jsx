import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MusicListSkeleton = ({ outputData }) => {
  return (
    <section className="p-[8px] pl-[0px] mx-auto">
      <ol className="flex md:gap-[5px] flex-wrap justify-center w-fit mx-auto">
        {outputData.map((x, i) => (
          <li
            key={i}
            className="min-w-[150px]"
          >
            <div className="cursor-pointer p-[10px] flex flex-col gap-[5px] items-start">
              <Skeleton className="rounded-[15px] w-28 h-28 m-[0px]" />
              <div className="">
                <h1 className="m-[0px ml-[5px]">
                  <Skeleton width={80} height={20} />
                </h1>
                <h1 className="m-[0px] ml-[5px]">
                  <Skeleton width={60} height={10} />
                </h1>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default MusicListSkeleton;
