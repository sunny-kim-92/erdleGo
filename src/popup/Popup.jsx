import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import './Popup.css'

export const Popup = ({ testCount }) => {
  const [count, setCount] = useState(testCount || 0)
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    chrome.runtime.sendMessage({ type: 'addScore', data: { score: data.text } })
  }

  const minus = () => {
    if (count > 0) {
      setCount(count - 1)
      sendCount(count - 1)
    }
  }

  const add = () => {
    setCount(count + 1)
    sendCount(count + 1)
  }

  const sendCount = (newCount) => {
    chrome.runtime.sendMessage({ type: 'setCount', data: { count: newCount } })
  }

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)()
    }
  };

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      console.log(result)
      setCount(result.count || 0)
    })
  }, [])

  return (
    <main>
      <div className="calc">
        <button onClick={minus} disabled={count <= 0}>
          -
        </button>
        {isLoading
          && <label>{count}</label>
        }
        <button onClick={add}>+</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          onKeyUp={handleUserKeyPress}
          {...register("text", { required: true })}
        />
        {errors.text?.type === "required" && (
          <p role="alert">Text is required</p>
        )}
      </form>
    </main>
  )
}

export default Popup
