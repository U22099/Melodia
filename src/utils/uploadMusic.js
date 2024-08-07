import convertMusic from './convertMusic.js'
import origin from '../../config/origin.json'
import  axios from 'axios'


const uploadMusic = async (setUpload, fileRef, username, setFileCount, setErr) => {
     try {
       setUpload({ state: false, msg: "" });
       const file = Array.from(fileRef.current.files);
       const output = await Promise.all(
        file.map(async (x) => await convertMusic(x))
       );
       const url = origin.default.origin + "/musicapi";
       const DATA = output.map((x) => {
         return {
           artist: x.artist,
           title: x.title,
           genre: x.genre,
           image: x.image,
           data: x.data,
           uploader: username,
         };
       });
       const response = await axios.post(url, DATA, {
         withCredentials: true,
         headers: {
           "Content-Type": "application/json",
         },
     });
     if (response.status === 200) {
         setUpload({ state: true, msg: response.data.message, show: true });
         setFileCount(0);
       }
     } catch (err) {
       setErr({ occured: true, msg: err.message });
       setUpload({ state: true, msg: err.response.data.message, show: false });
     }
   };
   
   export default uploadMusic