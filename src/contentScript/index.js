console.info('contentScript is running')

// chrome.runtime.onMessage.addListener(
//     function (message, sender, sendResponse) {
//         switch (message.type) {
//             case "getText":
//                 let arr = document.querySelectorAll('p')
//                 // console.log(arr)
//                 // if(arr.length){
//                 //     console.log(arr[1].textContent)
//                 // }
//                 sendResponse(arr[1].textContent);
//             case "getCount":
//                 let final = 0
//                 chrome.storage.sync.get(['count'], (result) => {
//                     console.log('content got fetch: ' + result)
//                     final = result.count
//                 })
//                 return final
//             // case "setCount":
//             //     console.log('content got set: ' + message.data.count)
//             //     chrome.storage.sync.set({ count: message.data.count })
//         }
//     }
// );