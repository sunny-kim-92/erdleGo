console.log('background is running')
import parseScore from './parser.js'

// Launch IndexedDB
let db;
const dbRequest = indexedDB.open("database");
dbRequest.onerror = (event) => {
  console.error("Error");
};
dbRequest.onsuccess = (event) => {
  db = event.target.result;
};

dbRequest.onupgradeneeded = (event) => {
  const db = event.target.result;

  const objectStore = db.createObjectStore("scores", { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex("game", "game", { unique: false });
  objectStore.createIndex("date", "date", { unique: false });
};


// Helpers
function calculateScore(text) {
  let res = parseScore(text)
  if (res != 'error') {
    insertScore(res)
  }
}

function insertScore(obj) {
  let db;
  const dbRequest = indexedDB.open("database");
  dbRequest.onerror = (event) => {
    console.error("Error");
  };
  dbRequest.onsuccess = (event) => {
    db = event.target.result;
    const scoreObjectStore = db
      .transaction("scores", "readwrite")
      .objectStore("scores");
    scoreObjectStore.add(obj);
  };
}


// Listener
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'addScore') {
    calculateScore(request.data.text)
  }
})