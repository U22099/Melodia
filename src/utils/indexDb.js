const init = async (objStore) => {
    const db = await indexedDB.open("Melodia", 1);
    db.createObjectStore(objStore);
    return db;
}
const saveData = async (data, objStore) => {
    const db = await init(objStore);
    const transaction = db.transaction(objStore, 'readwrite');
    const store = transaction.objectStore(objStore);
    await store.add(data, 1);
}
const getData = async (objStore) => {
    const db = await init(objStore);
    const transaction = db.transaction(objStore, 'readonly');
    const store = transaction.objectStore(objStore);
    const data = await store.getAll();
    return data;
}

module.exports = {saveData, getData}
