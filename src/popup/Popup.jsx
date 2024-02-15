import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import './Popup.css'

export const Popup = () => {
  const [list, setList] = useState([])
  const [error, setError] = useState('')
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
    const res = await chrome.runtime.sendMessage({ type: 'getList' })
  }

  function toDisplayString(text){
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
      setList([...request.list])
      console.log(request.list)
    } else if (request.type == 'scoreSaved') {
      console.log(request.score)
    }
  })

  return (
    <main>
      <table>
        {list.map((score) => {
          return <tr key={score.slug}>
            <td>{toDisplayString(score.game)}</td>
            <td>{score.score}</td>
          </tr>
        })}
      </table>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          // onKeyUp={handleUserKeyPress}
          {...register("text", { required: true })}
        />
        {errors.text?.type === "required" && (
          <p role="alert">Text is required</p>
        )}
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </form>
    </main>
  )
}

export default Popup
