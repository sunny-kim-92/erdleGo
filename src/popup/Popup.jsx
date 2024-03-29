import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import './Popup.css'

export const Popup = ({ testCount }) => {
  const [count, setCount] = useState(testCount || 0)
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

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCount(result.count || 0)
    })
  }, [])

  return (
    <main>
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
