const init = (objStore) => {
    console.log("init0");
    const opendb = indexedDB.open("Melodia");
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(objStore);
    }
    return opendb;
}
const saveData = (data, objStore) => {
    console.log("savedata0")
    const request = (init(objStore)).result;
    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(objStore, 'readwrite');
        const store = transaction.objectStore(objStore);
        store.put(data);
        transaction.oncomplete = () => {
            db.close();
        }
    }
}
const getData = (objStore) => {
    console.log("called getData0");
    const request = (init(objStore)).result;
    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(objStore, 'readonly');
        const store = transaction.objectStore(objStore);
        const result = store.getAll();
        let data = ""
        result.onsuccess = () => {
            data = result.result;
            console.log(result.result);
        }
        transaction.oncomplete = () => {
            db.close();
        }
        console.log(data)
        return data;
    }
}
saveData([2,3,4,5], "Test");
getData("Test");

module.exports = {saveData, getData}
