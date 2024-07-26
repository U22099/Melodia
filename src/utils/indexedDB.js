const init = async (objStore) => {
    console.log("init");
    const db = await indexedDB.open("Melodia");
    db.createObjectStore(objStore);
    return db;
}
const saveData = async (data, objStore) => {
    console.log("savedata")
    const db = await init(objStore);
    const transaction = db.transaction(objStore, 'readwrite');
    const store = transaction.objectStore(objStore);
    await store.add(data, 1);
}
const getData = async (objStore) => {
    console.log("called getData");
    const db = await init(objStore);
    const transaction = db.transaction(objStore, 'readonly');
    const store = transaction.objectStore(objStore);
    const data = await store.getAll();
    return data;
}
init()
module.exports = {saveData, getData}
