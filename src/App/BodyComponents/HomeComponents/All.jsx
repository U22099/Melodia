import { useState, useContext } from "react";
import MusicList from "./AllComponents/MusicList";
import { Context } from "../../Body";

const All = () => {
  let id = "";
  const { loading, music, play } = useContext(Context);
  return (
    <div className="overflow-auto overflow-x-hidden max-h-[85vh] w-[100%]">
      <section className="flex justify-end p-[10px] pb-[0px] md:w-[90%] mx-auto">
        {/* <MdRefresh
          className={
            (spinning ? "animate-spin-once " : "") +
            "cursor-pointer text-[2.6em] fill-[var(--secondary-color)] bg-[hsl(0,5%,2%)] p-[10px] rounded-[10px]  mt-[15px] mb-[5px]"
          }
          // onClick={refreshState}
        /> */}
      </section>
      <section className="mx-auto w-[100%]">
        <MusicList loading={loading} outputData={music} play={play} />
      </section>
      {/* {success ? <SuccessDialog msg="Music deleted successfully" /> : ""}
      {confirm ? (
        <ConfirmDialog
          callback={deleteMusic}
          var2={setConfirm}
          msg="Are you sure you'd like to delete this music?"
        />
      ) : (
        ""
      )}
      {props.err.occured ? (
        <ErrorDialog msg={props.err.msg} setErr={props.setErr} />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default All;
