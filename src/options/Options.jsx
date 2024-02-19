import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import './Options.css'

const allGames = [
  {
    name: 'Wordle',
    value: 'wordle'
  },
  {
    name: 'Connections',
    value: 'connections'
  },
  {
    name: 'Immaculate Footy',
    value: 'immaculate_footy'
  },
  {
    name: "Immaculate Basketball (Men's)",
    value: 'immaculate_basketball_mens'
  },
  {
    name: "Immaculate Basketball (Womens's)",
    value: 'immaculate_basketball_womens'
  },
  {
    name: "Immaculate Baseball",
    value: 'immaculate_baseball'
  },
  {
    name: "Immaculate Hockey",
    value: 'immaculate_basketball_hockey'
  },
  {
    name: "Tradle",
    value: 'tradle'
  },
  {
    name: "Globle",
    value: 'globle'
  },
  {
    name: "PokeDoku",
    value: 'pokedoku'
  },
  {
    name: "Costcodle",
    value: 'costcodle'
  },
  {
    name: "Cine2Nerdle",
    value: 'cine2nerdle'
  },
  {
    name: "Dozen",
    value: 'dozen'
  },
]

export const Options = () => {
  const [defaultGames, setDefaultGames] = useState({})
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    chrome.storage.sync.set({ 'defaultGames': data }, () => {
      chrome.storage.sync.get(['defaultGames'], (result) => {
        // console.log(result.defaultGames)
        setDefaultGames(result.defaultGames || [])
      })
    })
  }

  useEffect(() => {
    chrome.storage.sync.get(['defaultGames'], (result) => {
      console.log(result.defaultGames)
      setDefaultGames(result.defaultGames)
    })
  }, [])

  useForm({
    defaultValues: async () => defaultGames
  })

  return (
    <main>
      <h3>Options Page</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            {
              allGames.map((game, index) => (
                <tr key={index}>
                  <td>
                    {game.name}
                  </td>
                  <td>
                    <input
                      {...register(game.value)}
                      // defaultChecked={defaultGames[game.value]}
                      type="checkbox"></input>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </form>
    </main>
  )
}

export default Options
