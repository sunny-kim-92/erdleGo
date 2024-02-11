console.log('background is running')
// console.log('⬛'.codePointAt(0))
// console.log('🟩'.codePointAt(0))
// console.log('🟨'.codePointAt(0))
// Wordle 966 5/6

// ⬛🟩⬛⬛🟨
// 🟨🟩⬛🟨⬛
// 🟨🟩🟨⬛⬛
// 🟨🟩⬛🟩🟩
// 🟩🟩🟩🟩🟩

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

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'addScore') {
    parseScore(request.data.text)
  }

  if (request.type === 'getCount') {
    let final = 0
    chrome.storage.sync.get(['count'], (result) => {
      console.log('background got fetch: ' + result.count)
      final = result.count
    })
    return final
  }
})

function parseScore(text) {
  let fullArr = text.split(`\n`)
  let titleArr = fullArr[0].split(' ')
  let gameNumber = titleArr[0]
  let answerArr = fullArr.slice(2)
  let score = answerArr.length
  insertScore({
    score: score,
    game: 'wordle',
    date: gameNumber,
    graph: answerArr
  })
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