import axios from 'axios'
import indexedDB from './indexedDB.js'
import origin from '../../config/origin.json'

const fetchMusicDataById = async (file, x, _id, setErr, setFile) => {
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
            indexedDB.saveData({...file, data: response.data.music.data}, "MusicData", indexedDB.init);
            setFile({...file, data: response.data.music.data});
            localStorage.setItem('music_stored', true);
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