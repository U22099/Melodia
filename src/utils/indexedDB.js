const init = () => {
    const opendb = indexedDB.open("Melodia");
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("MusicData");
        db.createObjectStore("UserData");
    }
    return opendb;
}
const saveData = (data, objStore, init) => {
    const request = init();
    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(objStore, 'readwrite');
        const store = transaction.objectStore(objStore);
        store.put(data, 1);
        transaction.oncomplete = () => {
            db.close();
        }
    }
}
const getData = (objStore, init) => {
    const request = init();
    return new Promise(resolve => {
        request.onsuccess = event => {
            const db = event.target.result;
            const transaction = db.transaction(objStore, 'readonly');
            const store = transaction.objectStore(objStore);
            const result = store.getAll();
            result.onsuccess = () => {
                resolve(result.result);
            }
            transaction.oncomplete = () => {
                db.close();
            }
        }
    });
}
const data = await indexedDB.getData("MusicData", indexedDB.init);
console.log(data, "retrieved")
export default { saveData, getData, init }
