import { useContext } from "react";
import { Context } from "./Body";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const NavBar = ({ section, setSection, setMenu, menu }) => {
  const { loading, image, setRefresh, refresh,} = useContext(Context);
  return (
    <>
      <div className="flex gap-[8px] items-center ml-[16px]">
        <h1
          className={
            (section === 1 ? "active " : "") +
            "cursor-pointer transition ease-in font-custom text-gray-300 hover:text-white"
          }
          onClick={() => {
            setSection(1);
          }}
        >
          {" "}
          Explore
        </h1>
        <h1
          className={
            (section === 2 ? "active " : "") +
            "cursor-pointer transition ease-in font-custom text-gray-300 hover:text-white"
          }
          onClick={() => {
            setSection(2);
          }}
        >
          All
        </h1>
      </div>
      <div className="flex justify-end align-center items-center"
       onClick={loading ? () => {
              setMenu(!menu);
            } : ""}
          />
       >
        {loading ? (
          <Skeleton
            className="rounded-full w-12 h-12 cursor-pointer"
            onClick={() => {
              setMenu(!menu);
            }}
          />
        ) : (
          <img
            src={image}
            alt="Profile Picture"
            className="bg-[var(--primary-color)] rounded-full w-12 h-12 cursor-pointer"
            onClick={() => {
              setMenu(!menu);
            }}
            onDoubleClick={() => {
              setRefresh({refresh: !refresh, first: false});
            }}
          />
          )}
      </div>
    </>
  );
};

export default NavBar;
