import { useState, useEffect } from 'react'
import { Frequency } from './Frequency'

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
    value: 'immaculateFooty'
  },
  {
    name: "Immaculate Basketball (Men's)",
    value: 'immaculateBasketballMens'
  },
  {
    name: "Immaculate Basketball (Womens's)",
    value: 'immaculateBasketballWomens'
  },
  {
    name: "Immaculate Baseball",
    value: 'immaculateBaseball'
  },
  {
    name: "Immaculate Hockey",
    value: 'immaculateHockey'
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
  const [wordle, setWordle] = useState(false)
  const [dozen, setDozen] = useState(false)
  const [cine2Nerdle, setCine2Nerdle] = useState(false)
  const [costcodle, setCostcodle] = useState(false)
  const [pokedoku, setPokedoku] = useState(false)
  const [globle, setGloble] = useState(false)
  const [tradle, setTradle] = useState(false)
  const [immaculateHockey, setImmaculateHockey] = useState(false)
  const [immaculateFooty, setImmaculateFooty] = useState(false)
  const [immaculateBaseball, setImmaculateBaseball] = useState(false)
  const [immaculateBasketballMens, setImmaculateBasketballMens] = useState(false)
  const [immaculateBasketballWomens, setImmaculateBasketballWomens] = useState(false)
  const [connections, setConnections] = useState(false)
  const [chartData, setChartData] = useState([])

  const onSubmit = () => {
    chrome.storage.sync.set({
      'defaultGames': {
        'wordle': wordle,
        'dozen': dozen,
        'cine2Nerdle': cine2Nerdle,
        'costcodle': costcodle,
        'pokedoku': pokedoku,
        'globle': globle,
        'tradle': tradle,
        'immaculateHockey': immaculateHockey,
        'immaculateFooty': immaculateFooty,
        'immaculateBaseball': immaculateBaseball,
        'immaculateBasketballMens': immaculateBasketballMens,
        'immaculateBasketballWomens': immaculateBasketballWomens,
        'connections': connections
      },
      'lastUpdated': null
    }, () => {
    })
  }

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getChartData' })
    chrome.storage.sync.get(['defaultGames'], (result) => {
      setWordle(result.defaultGames.wordle || false)
      setDozen(result.defaultGames.dozen || false)
      setCine2Nerdle(result.defaultGames.Cine2Nerdle || false)
      setCostcodle(result.defaultGames.costcodle || false)
      setPokedoku(result.defaultGames.pokedoku || false)
      setGloble(result.defaultGames.globle || false)
      setTradle(result.defaultGames.tradle || false)
      setImmaculateHockey(result.defaultGames.immaculateHockey || false)
      setImmaculateBaseball(result.defaultGames.immaculateBaseball || false)
      setImmaculateBasketballMens(result.defaultGames.immaculateBasketballMens || false)
      setImmaculateBasketballWomens(result.defaultGames.immaculateBasketballWomens || false)
      setImmaculateFooty(result.defaultGames.immaculateFooty || false)
      setConnections(result.defaultGames.connections || false)
    })
  }, [])

  // Chrome Listener
  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type == 'chartDataRefreshed') {
      if (request.chartData) {
        let scores = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0
        }

        request.chartData.forEach((game) => {
          scores[game.score]++
        })
        let dataset = []
        for (let scoreIndex in scores) {
          dataset.push({ x: scores[scoreIndex], y: scoreIndex })
        }
        console.log(dataset)
        setChartData(dataset)
      }
    }
  })

  return (
    <main>
      <h3>Options Page</h3>
      <Frequency chartData={chartData} />
      <table>
        <tbody>
          <tr key={'wordle'}>
            <td>
              Wordle
            </td>
            <td>
              <input
                checked={wordle}
                onChange={e => {
                  setWordle(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'connections'}>
            <td>
              Connections
            </td>
            <td>
              <input
                checked={connections}
                onChange={e => {
                  setConnections(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'immaculateFooty'}>
            <td>
              Immaculate Footy
            </td>
            <td>
              <input
                checked={immaculateFooty}
                onChange={e => {
                  setImmaculateFooty(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'immaculateBasketballMens'}>
            <td>
              Immaculate Basketball Men's
            </td>
            <td>
              <input
                checked={immaculateBasketballMens}
                onChange={e => {
                  setImmaculateBasketballMens(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'immaculateBasketballWomens'}>
            <td>
              Immaculate Basketball Womens
            </td>
            <td>
              <input
                checked={immaculateBasketballWomens}
                onChange={e => {
                  setImmaculateBasketballWomens(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'immaculateBaseball'}>
            <td>
              Immaculate Baseball
            </td>
            <td>
              <input
                checked={immaculateBaseball}
                onChange={e => {
                  setImmaculateBaseball(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'immaculateHockey'}>
            <td>
              Immaculate Hockey
            </td>
            <td>
              <input
                checked={immaculateHockey}
                onChange={e => {
                  setImmaculateHockey(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'tradle'}>
            <td>
              Tradle
            </td>
            <td>
              <input
                checked={tradle}
                onChange={e => {
                  setTradle(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'globle'}>
            <td>
              Globle
            </td>
            <td>
              <input
                checked={globle}
                onChange={e => {
                  setGloble(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'pokedoku'}>
            <td>
              Pokedoku
            </td>
            <td>
              <input
                checked={pokedoku}
                onChange={e => {
                  setPokedoku(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'costcodle'}>
            <td>
              Costcodle
            </td>
            <td>
              <input
                checked={costcodle}
                onChange={e => {
                  setCostcodle(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'cine2nerdle'}>
            <td>
              Cine2Nerdle
            </td>
            <td>
              <input
                checked={cine2Nerdle}
                onChange={e => {
                  setCine2Nerdle(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
          <tr key={'dozen'}>
            <td>
              Dozen
            </td>
            <td>
              <input
                checked={dozen}
                onChange={e => {
                  setDozen(e.target.checked)
                }}
                type="checkbox"></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={onSubmit}>Submit</button>
    </main>
  )
}

export default Options
