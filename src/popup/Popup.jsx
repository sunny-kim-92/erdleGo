import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import './Popup.css'

export const Popup = () => {
  const [scoresList, setScoresList] = useState([])
  const [defaultGames, setDefaultGames] = useState([])
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
    const defaultList = await chrome.storage.sync.get(['lastUpdated', 'defaultGames'])
    const todayString = getTodayDateString()
    console.log(defaultList)
    if (defaultList.lastUpdated != todayString) {
      const res = await chrome.runtime.sendMessage({ type: 'getList' })
      await chrome.storage.sync.set({ 'lastUpdated': todayString })
    } else {
      const defaultGamesArr = []
      for (let game in defaultList.defaultGames) {
        if (defaultList.defaultGames[game]) {
          defaultGamesArr.push({
            'game': game,
            'score': scoresList[game] || null
          })
        }
      }
      setDefaultGames([...defaultGamesArr])
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
    let arr = text.split('_')
    let final = []
    arr.forEach((word) => {
      final.push(word.charAt(0).toUpperCase() + word.slice(1))
    })
    return final.join(' ')
  }

  useEffect(() => {
    fetchData()
  }, [])

  chrome.runtime.onMessage.addListener((request) => {
    if (request.type == 'updateList') {
      const gameList = defaultGames
      console.log('got update')
      request.list.forEach((score) => {
        gameList.forEach((defaultGame) => {
          let camelCased = score.game.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
          if (camelCased == defaultGame.game) {
            defaultGame.score = score.score
          }
        })
      })
      setDefaultGames([...gameList])
    } else if (request.type == 'scoreSavedSuccess') {
      const todayDate = getTodayDateString()
      if (request.score.date == todayDate) {
        const gameList = defaultGames
        gameList.forEach((game) => {
          if (game.game == request.score.game) {
            game.score = request.score.score
          }
        })
        setDefaultGames([...gameList])
      }
    } else if (request.type == 'scoreSavedError') {
      setSaveError('Could not read score.')
      setTimeout(() => {
        setSaveError('')
      }, 3000)
    }
  })

  return (
    <main>
      <div>
        <table style={{ margin: 'auto', borderSpacing: '20px 5px' }}>
          <tbody>
            {defaultGames.map((score, i) => {
              return <tr key={i}>
                <td style={{ textAlign: 'start' }}>{toDisplayString(score.game)}</td>
                <td style={{ textAlign: 'start' }}>{score.score}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
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
