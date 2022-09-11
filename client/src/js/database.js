import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb invoked');
  // Create a connection to IndexDB jate database
  const jateDB = await openDB('jate', 1);
  // Create a new transaction
  // specify the database and data priviliges
  const tx = jateDB.transaction('jate', 'readwrite');
  // Open the required object store and add content to it
  const store = tx.objectStore('jate');
  const request = store.add({ text: content });

  const result = await request;
  console.log('Data saved to the database!  Whoop.', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb invoked');
  // Create a connection to IndexDB jate database
  const jateDB = await openDB('jate', 1);
  // Create a new transaction
  // specify the database and data priviliges
  const tx = jateDB.transaction('jate', 'readonly');
  // Open the required object store and add content to it
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  console.log('Data saved to the database!  Whoop.', result);
};

initdb();
