import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import linkHash from "./data.js"

import './Popup.css'

export const Popup = () => {
  const [scoresList, setScoresList] = useState([])
  const [saveError, setSaveError] = useState('')
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    chrome.runtime.sendMessage({ type: 'addScore', data: { text: data.text } })
  }

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)()
    }
  };

  async function fetchData() {
    const defaultList = await chrome.storage.sync.get(['lastUpdated', 'defaultGames', 'scoresList'])
    const todayString = getTodayDateString()
    if (defaultList.lastUpdated != todayString) {
      const res = await chrome.runtime.sendMessage({ type: 'refreshScoresList' })
      await chrome.storage.sync.set({ 'lastUpdated': todayString })
    } else {
      setScoresList(defaultList.scoresList)
    }
  }

  function getTodayDateString() {
    function pad(text) {
      return ('00' + text).slice(-2)
    }

    const today = new Date()
    const todayString = today.getUTCFullYear() + '-' + pad(today.getUTCMonth() + 1) + '-' + pad(today.toDateString().slice(8, 10))

    return todayString
  };

  function toDisplayString(text) {
    let initialWords = text.split(/(?=[A-Z])/)
    let display = []
    initialWords.forEach((word) => {
      display.push(word.charAt(0).toUpperCase() + word.slice(1))
    })
    return display.join(' ')
  }

  function openTab(e){
    let camelCase = e.target.textContent.split(' ')
    camelCase[0] = camelCase[0].charAt(0).toLowerCase() + camelCase[0].slice(1)
    for(let i = 1; i < camelCase.length; i++){
      camelCase[i] = camelCase[i].charAt(0).toUpperCase() + camelCase[i].slice(1)
    }
    camelCase = camelCase.join('')
    let url = linkHash[camelCase]
    chrome.tabs.create({ url: url, active: false })
  }

  useEffect(() => {
    fetchData()
  }, [])

  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type == 'scoresListRefreshed') {
      setScoresList(request.list)
    }
    else if (request.type == 'scoreSavedSuccess') {
      const todayDate = getTodayDateString()
      if (request.score.date == todayDate) {
        let scores = await chrome.storage.sync.get('scoresList')
        scores = scores.scoresList
        scores.forEach((game) => {
          if (game.game == request.score.game) {
            game.score = request.score.score
          }
        })
        setScoresList([...scores])
      }
    } else if (request.type == 'scoreSavedError') {
      setSaveError('Could not read score.')
      setTimeout(() => {
        setSaveError('')
      }, 8000)
    }
  })

  return (
    <main>
      <h1>ERDLE Tracker</h1>
        <table style={{ margin: 'auto', borderSpacing: '20px 5px' }}>
          <tbody>
            {scoresList.map((score, i) => {
              return <tr key={i}>
                <td style={{ textAlign: 'start', cursor: 'pointer' }} onClick={openTab}>{toDisplayString(score.game)}</td>
                <td style={{ textAlign: 'start' }}>{score.score}</td>
              </tr>
            })}
          </tbody>
        </table>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          rows="8"
          cols="25"
          // onKeyUp={handleUserKeyPress}
          {...register("text", { required: true })}
        />
        {errors.text?.type === "required" && (
          <p role="alert">Text is required</p>
        )}
        {saveError && (
          <p role="alert">{saveError}</p>
        )}
        <br />
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </form>
    </main>
  )
}

export default Popup
