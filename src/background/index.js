import { parseScore } from './parser.js'

// Launch IndexedDB
let db;
const dbRequest = indexedDB.open('database');
dbRequest.onerror = (event) => {
  console.error('error');
};
dbRequest.onsuccess = (event) => {
  db = event.target.result;
};

dbRequest.onupgradeneeded = (event) => {
  const db = event.target.result;

  const objectStore = db.createObjectStore('scores', { keyPath: 'slug' });
  objectStore.createIndex('game', 'game', { unique: false });
  objectStore.createIndex('date', 'date', { unique: false });
};


// Helpers
function calculateScore(text) {
  let res = parseScore(text)
  if (res != 'Error') {
    insertScore(res)
  }
}

function insertScore(obj) {
  let db;
  const dbRequest = indexedDB.open('database');
  dbRequest.onerror = (event) => {
    console.error('error');
  };
  dbRequest.onsuccess = (event) => {
    db = event.target.result;
    const scoreObjectStore = db
      .transaction('scores', 'readwrite')
      .objectStore('scores');

    //Find existing record if applicable
    const request = scoreObjectStore.get(obj.game + ':' + obj.date)
    request.onsuccess =
      (e) => {
        const requestUpdate = scoreObjectStore.put(obj);
        requestUpdate.onerror = (event) => {
          console.log('Error')
        };
        requestUpdate.onsuccess = (event) => {
          console.log('saved')
        };
      }
  };
}


// Listener
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'addScore') {
    calculateScore(request.data.text)
  }
})