import toBase64 from './Base64.js'
import getMusicMetaData from './getMusicMetaData.js'

const convertMusic = async (file) => {
     const data = await toBase64(file);
     const { artist, title, genre, image } = await getMusicMetaData(file);
  
     return {
       artist: artist,
       title: title,
       genre: genre,
       image: image,
       data: data,
     };
  };
  
  export default convertMusic