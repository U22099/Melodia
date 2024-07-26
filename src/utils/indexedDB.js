const init = (objStore) => {
    console.log("init");
    const opendb = indexedDB.open("Melodia");
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(objStore);
    }
    return opendb;
}
const saveData = (data, objStore) => {
    console.log("savedata")
    const db = (init(objStore)).result;
    const transaction = db.transaction(objStore, 'readwrite');
    const store = transaction.objectStore(objStore);
    store.put(data);
    transaction.oncomplete = () => {
        db.close();
    }
}
const getData = (objStore) => {
    console.log("called getData");
    const db = (init(objStore)).result;
    const transaction = db.transaction(objStore, 'readonly');
    const store = transaction.objectStore(objStore);
    const result = store.getAll();
    let data = ""
    result.onsuccess = () => {
        data = result.result;
    }
    transaction.oncomplete = () =.; {
        db.close();
    }
    return data;
}
init("Music")
module.exports = {saveData, getData}
