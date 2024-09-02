import { useContext, useEffect } from "react";
import { Context } from "./Body";
import Skeleton from "react-loading-skeleton";

const NavBar = ({ section, setSection, setMenu, menu }) => {
  const { loading, image, setRefresh, refresh } = useContext(Context);
  useEffect(() => {
    if (loading) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, [loading]);
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
      <div className="flex justify-end align-center items-center">
        {loading ? (
          <Skeleton className="rounded-full w-12 h-12 cursor-pointer" />
        ) : (
          <img
            src={image}
            alt="Profile Picture"
            className="bg-[var(--primary-color)] rounded-full w-12 h-12 cursor-pointer"
            onClick={() => {
              setMenu(!menu);
            }}
            onDoubleClick={() => {
              localStorage.setItem("user_stored", false)
              localStorage.setItem("dev__stored", false)
              localStorage.setItem("music_stored", false)
              localStorage.setItem("recent_music_stored", false)
              localStorage.setItem("top_music_stored", false)
              setRefresh({ refresh: !refresh.refresh, first: false });
            }}
          />
        )}
      </div>
    </>
  );
};

export default NavBar;
