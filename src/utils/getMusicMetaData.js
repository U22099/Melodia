import toBase64 from './Base64.js'

const getMusicMetaData = async (file) => {
     const jsmediatags = window.jsmediatags;
     return new Promise((resolve, reject) => {
       jsmediatags.read(file, {
         onSuccess: async (tag) => {
           const result = {
             artist: tag.tags.artist || "---",
             title: tag.tags.title,
             genre: tag.tags.genre || "---",
             image: tag.tags.picture
               ? await toBase64(
                   new Blob([new Uint8Array(tag.tags.picture.data)], {
                     type: tag.tags.picture.format,
                   })
                 )
               : toBase64("image.JPG"),
           };
       console.log(result);
           resolve(result);
        },
        onError: (err) => {
           reject(tag);
         },
       });
     });
  };
  
  export default getMusicMetaData