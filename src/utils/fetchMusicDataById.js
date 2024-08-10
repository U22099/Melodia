import axios from 'axios'
import indexedDB from './indexedDB.js'
import origin from '../../config/origin.json'

const fetchMusicDataById = async (file, x, _id, setErr, setFile, storageName, dbName, music) => {
    try {
        if(!file[x].data){
            const url = origin.default.origin + '/musicapi/data';
            const response = await axios.post(url, { "_id": _id },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const newMusic = music.map(x => {
                if(x._id === _id){
                    return {...x, data: response.data.music.data};
                } else {
                    return x;
                }
            });
            const newFile = file.map((music, i) => {
                if(i === x){
                    return {...music, data: response.data.music.data};
                } else {
                    return music;
                }
            });
            indexedDB.saveData(newFile, dbName, indexedDB.init);
            indexedDB.saveData(newMusic, "MusicData", indexedDB.init);
            setFile(newFile);
            return response.data.music.data
        } else {
            return file[x].data
        }
    } catch (err) {
        console.log(err)
        setErr({ occured: true, msg: err.message });
    }
}

export default fetchMusicDataById