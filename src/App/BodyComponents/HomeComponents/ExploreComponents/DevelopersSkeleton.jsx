import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DevelopersSkeleton = ({ devData }) => {
  return (
    <section className="p-[8px] pl-[0px]">
      <ol className="flex gap-[10px] overflow-auto overflow-y-hidden">
        {devData.map((x, i) => (
          <li key={i} className="min-w-[250px]">
            <div className="cursor-pointer p-[10px] rounded-[10px] flex  gap-[5px] items-center justify-center">
              <Skeleton
                borderRadius={100}
                className="rounded-full w-36 h-36 m-[0px]"
              />
              <div className="flex flex-col justify-center items-start flex-wrap w-[100%]">
                <h1 className="font-extrabold md:text-[1.3em] font-serif m-[0px] ml-[5px]">
                  <Skeleton width="80px" height="20px" />
                </h1>
                <h1 className="text-gray-300 text-[0.7em] md:text-[1em] font-serif m-[0px] ml-[5px]">
                  <Skeleton width="60px" height="10px" />
                </h1>
                <a className="text-black text-[0.8em] md:text-[1em] font-serif m-[0px] ml-[5px] rounded p-[0px] mt-[20px]">
                  <Skeleton borderRadius="1rem" width="80px" height="20px" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default DevelopersSkeleton;
