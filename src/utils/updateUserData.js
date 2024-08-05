import refresh from './fetchUserData.js'
import axios from 'axios'
import indexedDB from './indexedDB.js'

  const updateUserData = async (navigate, username, email, image, setText, text, setErrorText, setLoading) => {
     if (username && email && image) {
       try {
         let x = 0;
         const myInterval = setInterval(()=>{
           const arr = ['.','..','...'];
           if(x === 3){
             setText('Updating');
             x = 0
           } else {
             setText('Updating'+arr[x]);
             x++;
           }
         }, 500);
         setLoading(true);
         const DATA = {
           username: username,
           email: email,
           image: image,
         };
         console.log(DATA);
         const url = origin.default.origin + "/user";
         const accessToken = localStorage.getItem("accessToken");
         const response = await axios.put(url, DATA, {
           withCredentials: true,
           headers: {
             "Content-Type": "application/json",
             Authorization: "Bearer " + accessToken,
           },
         });
         indexedDB.saveData(
           {
             username: username,
             email: email,
             image: image,
          },
          "UserData",
          indexedDB.init
       );
         localStorage.setItem("user_stored", true);
         clearInterval(myInterval);
         setText("Done");
         setTimeout(()=>{
           setText('Save')
         }, 2000)
         setLoading(false);
       } catch (err) {
         if ([401, 402, 403, 404].includes(err.response.status)) {
           const res = await refresh(navigate);
           if (res.status === 200) updateUserData();
         } else {
           setErrorText(err.response.data.message);
         }
       }
     }
  };
  
  export default updateUserData