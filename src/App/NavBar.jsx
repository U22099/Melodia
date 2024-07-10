import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminPanel from '../AdminPanel'
import SuccessDialog from '../utils/SuccessDialog'
import ConfirmDialog from '../utils/ConfirmDialog'
import axios from 'axios'
import img from '../../public/image.JPG'
import toBase64 from './../utils/Base64.js'
import origin from '../../config/origin.json'

const NavBar = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const [text, setText] = useState("Save");
    const [errorText, setErrorText] = useState("");
    const [fileCount, setFileCount] = useState(0);
    const [upload, setUpload] = useState();
    const [confirm, setConfirm] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [otherData, setOtherData] = useState();
    const [image, setImage] = useState(img);
    const email = useRef("");
    const username = useRef("");
    const fetchUserData = async () => {
        try {
            const url = origin.default.origin + '/user';
            const response = await axios.get(url, { withCredentials: true });
            setImage(response.data.image);
            email.current = response.data.email;
            username.current = response.data.username;
            if (response.data.otherData) {
                setAdmin(true);
                setOtherData(response.data.otherData);
            }
        } catch (err) {
            if (err.response.status === 401) {
                const res = await refresh();
                if (res.status === 200){
                    fetchUserData();
                } else {
                    navigate('/', { replace: true });
                }
            }
        }
    }
    const refresh = async () => {
        try {
            const url = origin.default.origin + '/refresh';
            const response = await axios.post(url, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response
        } catch (err) {
            if ((err.response.status === 403) || err.response.status === 401) {
                navigate('/', { replace: true });
            }
        }
    }
    const handleImage = async (e) => {
        const data = await toBase64(e.target.files[0]);
        setImage(data);
    }
    const switchVisibility = (e) => {
        setMenu(!menu);
        e.target.style.border = menu ? "none" : "3px solid var(--secondary-color)";
    }
    const updateUserData = async () => {
        if (username && email && image) {
            try {
                setText(<a id="roll1"></a>);
                const DATA = {
                    'username': username.current,
                    'email': email.current,
                    'image': image
                }
                const url = origin.default.origin + '/user';
                const response = await axios.put(url, DATA,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                setText("Save");
            } catch (err) {
                if (err.response.status === 401) {
                    const res = await refresh();
                    if (res.status === 200) updateUserData();
                } else {
                    setErrorText(err.response.message);
                }
            }
        }
    }
    const logOut = async () => {
        try {
            const url = origin.default.origin + '/logout';
            const response = await axios.post(url, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    const uploadMusic = async () => {
        try {
            setUpload(false);
            const file = Array.from(document.getElementById('upload').files);
            const output = await Promise.all(file.map(async (x) => await convertMusic(x)));
            const url = origin.default.origin + '/musicapi';
            const DATA = output.map((x) => {
                return {
                    "artist": x.artist,
                    "title": x.title,
                    "genre": x.genre,
                    "image": x.image,
                    "data": x.data,
                    "uploader": username.current
                }
            })
            const response = await axios.post(url, DATA,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (response.status === 200) setUpload(true);
        } catch (err) {
            console.log(err);
        }
    }
    const convertMusic = async (file) => {
        const data = await toBase64(file);
        const { artist, title, genre, image } = await getMusicMetaData(file);

        return {
            "artist": artist,
            "title": title,
            "genre": genre,
            "image": image,
            "data": data
        }
    }
    const getMusicMetaData = async (file) => {
        const jsmediatags = window.jsmediatags;

        return new Promise((resolve, reject) => {
            jsmediatags.read(file, {
                onSuccess: async (tag) => {
                    const result = {
                        "artist": tag.tags.artist || '---',
                        "title": tag.tags.title,
                        "genre": tag.tags.genre || '---',
                        "image": (tag.tags.picture ? `${tag.tags.picture.format};base64,${(await toBase64(new Blob([tag.tags.picture.data]))).split(',')[1]}` : await toBase64(img))
                    }
console.log(result);
                    resolve(result);
                },
                onError: (err) => {
                    reject(tag);
                }
            });
        });
    }
    const deleteUser = async () => {
        try {
            const url = origin.default.origin + '/user';
            const response = await axios.delete(url, {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            await logOut();
            console.log("Deleted User Successfully");
        } catch (err) {
            if (err.response.status === 401) {
                const res = await refresh();
                if (res.status === 200) deleteUser();
            }
        }
    }
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <>
            <h1 className="text-[var(--secondary-color)] ml-[15px] text-[2.6em] w-[100%] flex justify-start font-[var(--font)] extrabold">Melodia</h1>
            <div className="flex justify-end align-center items-center relative">
                <img src={image} alt="Profile Picture" className="bg-[var(--primary-color)] rounded-full w-16 h-16 cursor-pointer" onClick={switchVisibility} />
                <div className={menu ? "grid grid-rows-[3fr_repeat(3,1fr)] gap-[10px] absolute bg-[var(--primary-color)] top-[50%] p-[20px] rounded-[10px] z-[10]" : "hidden"}>
                    <label htmlFor='inputImage'>
                        <input type="file" onChange={handleImage} accept="image/jpeg image/png image/jpg" id="inputImage" className="hidden" />
                        <img src={image} alt="Profile Picture" className="bg-[var(--primary-color)] rounded-full w-32 h-32 mx-auto" onClick={handleImage} />
                    </label>
                    <div>
                        <input type="text" ref={username} defaultValue={username.current} onChange={(e) => username.current = e.target.value} className="bg-[black] rounded-[5px] p-[10px] mx-auto text-[1.3em] text-[white]" />
                    </div>
                    <div>
                        <input type="text" ref={email} defaultValue={email.current} onChange={(e) => email.current = e.target.value} className="bg-[black] rounded-[5px] p-[10px] mx-auto text-[1.3em] text-[white]" />
                    </div>
                    <p className={errorText === "" ? "hidden" : "text-[0.8em] font-bold text-red-500"}>{errorText}</p>
                    <button className="btn w-[100%]" onClick={updateUserData}>{text}</button>
                    <button className="btn w-[100%] bg-red-600" onClick={() => {
                        setConfirm(true);
                    }}>Delete my account</button>
                    <hr className="" />
                    <div className="grid cursor-pointer grid-cols-[4fr_1fr]">
                        <label htmlFor='upload' className="cursor-pointer">
                            <input type="file" accept=".mp3" id="upload" className="hidden" onChange={(e) => setFileCount(e.target.files.length)} multiple />
                            <div className={((upload === false) ? "glow " : "") + "grid grid-cols-[4fr_1fr] border-[2px] border-white border-dashed text-[1.2em] font-bold rounded-[10px] p-[8px]"}>
                                <h1>Upload</h1>
                                <p className="text-[var(--secondary-color)] bold">{fileCount}</p>
                            </div>
                        </label>
                        <button className="btn bg-none extrabold" onClick={uploadMusic}>↑</button>
                    </div>
                    <Link to="/" className="link mt-[10px] text-[1.2em]" onClick={logOut}>Log Out</Link>
                    {admin ? <p to="/admin" className="link text-[var(--secondary-color)] mt-[5px] text-[1.2em]" onClick={() => setShowAdminPanel(true)}>Admin Panel</p> : ''}
                </div>
            </div>
            {upload ? <SuccessDialog msg="Uploaded successfully" /> : ''}
            {confirm ? <ConfirmDialog var={deleteUser} var2={
                setConfirm} msg="Are you sure about this, buddy?" /> : ''}
            {showAdminPanel ? <AdminPanel users={otherData.users} music_count={otherData.music_count} setShowAdminPanel={setShowAdminPanel} refresh={fetchUserData} /> : ''}
        </>
    )
}

export default NavBar
