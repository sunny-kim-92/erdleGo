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
  }
})

function parseScore(text) {
  let arr = text.split(`\n`)
  console.log(arr)
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