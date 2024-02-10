console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
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
