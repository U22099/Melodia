const init = (objStore) => {
    const opendb = indexedDB.open("Melodia");
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(objStore);
    }
    return opendb;
}
const saveData = (data, objStore) => {
    const request = init(objStore);
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
const getData = (objStore) => {
    const request = init(objStore);
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
module.exports = {saveData, getData}
