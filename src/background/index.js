import { parseScore } from './parser.js'

if ('crbug.com/1185241') {
  const { onMessage } = chrome.runtime, { addListener } = onMessage;
  onMessage.addListener = fn => addListener.call(onMessage, (msg, sender, respond) => {
    const res = fn(msg, sender, respond);
    if (res instanceof Promise) return !!res.then(respond, console.error);
    if (res !== undefined) respond(res);
  });
}
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
          chrome.runtime.sendMessage({type: 'scoreSavedError'})
        };
        requestUpdate.onsuccess = async (event) => {
          console.log('Saved')
          chrome.runtime.sendMessage({type: 'scoreSavedSuccess', score: obj})
        };
      }

    request.onerror = (e) => {
      console.log('Error')
      chrome.runtime.sendMessage({type: 'scoreSavedError'})
    }
  };
}

function getList() {
  console.log('in get list')
  const arr = []
  let db;
  const dbRequest = indexedDB.open('database');
  dbRequest.onerror = (event) => {
    console.error('error');
  };
  dbRequest.onsuccess = (event) => {
    db = event.target.result;
    const scoreObjectStore = db
      .transaction('scores', 'readonly')
      .objectStore('scores')
      .index('date')
      .openCursor()

    const today = new Date()
    const dateString = today.getUTCFullYear() + '-' + pad(today.getUTCMonth() + 1) + '-' + pad(today.toDateString().slice(8, 10))

    //Find existing record if applicable
    const request = scoreObjectStore
    request.onsuccess = (e) => {
      const cursor = e.target.result
      if (cursor) {
        if (cursor.key == dateString) {
          arr.push(cursor.value)
        }
        cursor.continue()
      }
      console.log('hi')
      chrome.runtime.sendMessage({ type: 'updateList', list: arr })
    }
  };
}

// Listener
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'addScore') {
    calculateScore(request.data.text)
  }

  if (request.type === 'getList') {
    getList()
  }
  return true
})

function pad(num) {
  return ('00' + num).slice(-2)
};
