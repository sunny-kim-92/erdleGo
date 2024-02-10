import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './Popup'
import './index.css'

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  console.log('popup opened')
});

// let count = 4
//   chrome.runtime.sendMessage({ type: 'getCount' }, (result) => {
//     console.log('popup is fetching')
//     count = result.count
//   })

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
)