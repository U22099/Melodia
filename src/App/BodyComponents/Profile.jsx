import React from 'react'

const profileLoader = () => {
  return (
    <div
          className={
            menu
              ? "grid grid-rows-[3fr_repeat(3,1fr)] gap-[10px] absolute bg-[var(--primary-color)] top-[50%] p-[20px] rounded-[10px] z-[10]"
              : "hidden"
          }
        >
          <label htmlFor="inputImage">
            <input
              type="file"
              onChange={handleImage}
              accept="image/jpeg, image/png, image/jpg"
              id="inputImage"
              className="hidden"
            />
            <img
              src={image}
              alt="Profile Picture"
              className="bg-[var(--primary-color)] rounded-full w-32 h-32 mx-auto"
            />
          </label>
          <div>
            <input
              type="text"
              ref={username}
              defaultValue={username.current}
              onChange={(e) => (username.current = e.target.value)}
              className="bg-[black] rounded-[5px] p-[10px] mx-auto text-[1.3em] text-[white]"
            />
          </div>
          <div>
            <input
              type="text"
              ref={email}
              defaultValue={email.current}
              onChange={(e) => (email.current = e.target.value)}
              className="bg-[black] rounded-[5px] p-[10px] mx-auto text-[1.3em] text-[white]"
            />
            <p
              className={
                errorText === ""
                  ? "hidden"
                  : "text-[0.8em] font-bold text-red-600"
              }
            >
              {errorText}
            </p>
          </div>
          <button className="btn w-[100%]" onClick={updateUserData}>
            {text}
          </button>
          <button
            className="btn w-[100%] bg-red-600"
            onClick={() => {
              setConfirm(true);
            }}
          >
            Delete my account
          </button>
          <hr className="" />
          <div className="grid cursor-pointer grid-cols-[4fr_1fr]">
            <label htmlFor="upload" className="cursor-pointer">
              <input
                type="file"
                accept=".mp3"
                id="upload"
                className="hidden"
                onChange={(e) => setFileCount(e.target.files.length)}
                multiple
              />
              <div
                className={
                  (upload.state === false ? "glow " : "") +
                  "grid grid-cols-[4fr_1fr] border-[2px] border-white border-dashed text-[1.2em] font-bold rounded-[10px] p-[8px]"
                }
              >
                <h1>Upload</h1>
                <p className="text-[var(--secondary-color)] bold">
                  {fileCount}
                </p>
              </div>
            </label>
            <button className="btn bg-none extrabold" onClick={uploadMusic}>
              ↑
            </button>
          </div>
          <p className="link mt-[10px] text-[1.2em]" onClick={logOut}>
            Log Out
          </p>
        </div>
  )
}

export default profileLoader