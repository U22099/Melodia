import axios from 'axios'
import indexedDB from './indexedDB.js'
import origin from '../../config/origin.json'

const fetchMusicDataById = async (file, x, _id, setSrc, setErr) => {
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
            file[x].data = response.data.music.data;
            indexedDB.saveData(file, "MusicData", indexedDB.init);
            localStorage.setItem('music_stored', true);
            setSrc(response.data.music.data);
        } else {
            setSrc(file[x].data);
        }
    } catch (err) {
        setErr({ occured: true, msg: err.message });
    }
}

export default fetchMusicDataById