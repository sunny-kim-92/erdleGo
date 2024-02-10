console.log('background is running')
console.log('⬛'.codePointAt(0))
console.log('🟩'.codePointAt(0))
console.log('🟨'.codePointAt(0))

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'addScore') {
    parseScore(request.data.score)
  }

  if (request.type === 'getCount') {
    let final = 0
    chrome.storage.sync.get(['count'], (result) => {
      console.log('background got fetch: ' + result.count)
      final = result.count
    })
    return final
  }
  if (request.type === 'setCount') {
    console.log('background got set: ' + request.data.count)
    chrome.storage.sync.set({ count: request.data.count })


    const customerData = [
      { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
      { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
    ];

    let db;
    const dbRequest = indexedDB.open("MyTestDatabase");
    dbRequest.onerror = (event) => {
      console.error("Why didn't you allow my web app to use IndexedDB?!");
    };
    dbRequest.onsuccess = (event) => {
      db = event.target.result;
    };

    dbRequest.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an objectStore to hold information about our customers. We're
      // going to use "ssn" as our key path because it's guaranteed to be
      // unique - or at least that's what I was told during the kickoff meeting.
      const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex("name", "name", { unique: false });

      // Create an index to search customers by email. We want to ensure that
      // no two customers have the same email, so use a unique index.
      objectStore.createIndex("email", "email", { unique: true });

      // Use transaction oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = (event) => {
        // Store values in the newly created objectStore.
        const customerObjectStore = db
          .transaction("customers", "readwrite")
          .objectStore("customers");
        customerData.forEach((customer) => {
          customerObjectStore.add(customer);
        });
      };

      const objStore = db.createObjectStore("names", { autoIncrement: true });

      // Because the "names" object store has the key generator, the key for the name value is generated automatically.
      // The added records would be like:
      // key : 1 => value : "Bill"
      // key : 2 => value : "Donna"
      customerData.forEach((customer) => {
        objStore.add(customer.name);
      });
    };

    // const transaction = db.transaction(["customers"], "readwrite");
    // transaction.oncomplete = (event) => {
    //   console.log("All done!");
    // };

    // transaction.onerror = (event) => {
    //   // Don't forget to handle errors!
    // };

    // const objectStore = transaction.objectStore("customers");
    // customerData.forEach((customer) => {
    //   const request = objectStore.add(customer);
    //   request.onsuccess = (event) => {
    //     // event.target.result === customer.ssn;
    //   };
    // });
  }
})

function parseScore(text) {
  let fullArr = text.split(`\n`)
  console.log(fullArr)
  let titleArr = fullArr[0].split(' ')
  let gameNumber = titleArr[1]
  let answerArr = fullArr.slice(2)
  let score = fullArr.length - 1
  // console.log('⬛')
  // console.log('🟩')
  // console.log('🟨')


  // Wordle 966 5/6

  // ⬛🟩⬛⬛🟨
  // 🟨🟩⬛🟨⬛
  // 🟨🟩🟨⬛⬛
  // 🟨🟩⬛🟩🟩
  // 🟩🟩🟩🟩🟩
}