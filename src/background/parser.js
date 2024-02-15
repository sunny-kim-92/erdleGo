// Helpers
export function parseScore(text) {
    let data = null
    if (text.indexOf('Wordle') != -1) {
        data = parseWordle(text)
    } else if (text.indexOf('Connections') != -1) {
        data = parseConnections(text)
    } else if (text.indexOf('https://www.immaculatefooty.com') != -1) {
        data = parseImmaculateFooty(text)
    } else if (text.indexOf('https://immaculategrid.com/basketball/mens') != -1) {
        data = parseImmaculateBasketballMens(text)
    } else if (text.indexOf('https://immaculategrid.com/basketball/womens') != -1) {
        data = parseImmaculateBasketballWomens(text)
    } else if (text.indexOf('https://immaculategrid.com/football') != -1) {
        data = parseImmaculateFootball(text)
    } else if (text.indexOf('https://immaculategrid.com/grid') != -1) {
        data = parseImmaculateBaseball(text)
    } else if (text.indexOf('https://immaculategrid.com/hockey') != -1) {
        data = parseImmaculateHockey(text)
    } else if (text.indexOf('https://games.oec.world/en/tradle') != -1) {
        data = parseTradle(text)
    } else if (text.indexOf('https://globle-game.com') != -1) {
        data = parseGloble(text)
    } else if (text.indexOf('https://pokedoku.com') != -1) {
        data = parsePokedoku(text)
    } else if (text.indexOf('https://costcodle.com') != -1) {
        data = parseCostcodle(text)
    } else if (text.indexOf('www.cinenerdle2.app') != -1) {
        data = parseCine2Nerdle(text)
    } else if (text.indexOf('DailyDozenTrivia.com') != -1) {
        data = parseDozen(text)
    } else {
        return 'error'
    }
    if (data.score) {
        data.score = parseInt(data.score)
    } if (data.gameNumber) {
        data.gameNumber = parseInt(data.gameNumber)
    } if (data.misc) {
        data.misc = parseInt(data.misc)
    }
    return data
}

function parseWordle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[1]
    let answerArr = fullArr.slice(2)
    let score = answerArr.length
    let date = convertDate('wordle', parseInt(gameNumber))

    return {
        score: score,
        game: 'wordle',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: null,
        link: null,
        slug: 'wordle:' + date
    }
}

function parseConnections(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[1].split(' ')

    let gameNumber = titleArr[1].substring(1)
    let answerArr = fullArr.slice(2)
    let score = answerArr.length
    let date = convertDate('connections', parseInt(gameNumber))

    return {
        score: score,
        game: 'connections',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: null,
        link: null,
        slug: 'connections:' + date
    }
}

function parseImmaculateFooty(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let answerArr = fullArr.slice(3, 6)
    let score = titleArr[4].charAt(0)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]
    let date = convertDate('immaculate_footy', parseInt(gameNumber))

    return {
        score: score,
        game: 'immaculate_footy',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'immaculate_footy:' + date
    }
}

function parseImmaculateBasketballMens(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[4]
    let score = titleArr[5].charAt(0)
    let answerArr = fullArr.slice(3, 6)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]
    let date = convertDate('immaculate_basketball_mens', parseInt(gameNumber))


    return {
        score: score,
        game: 'immaculate_basketball_mens',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'immaculate_basketball_mens:' + date
    }
}

function parseImmaculateBasketballWomens(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[4]
    let score = titleArr[5].charAt(0)
    let answerArr = fullArr.slice(3, 6)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]
    let date = convertDate('immaculate_basketball_womens', parseInt(gameNumber))

    return {
        score: score,
        game: 'immaculate_basketball_womens',
        date: date,
        gameNumber: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'immaculate_basketball_womens:' + date
    }
}

function parseImmaculateBaseball(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let score = titleArr[4].charAt(0)
    let answerArr = fullArr.slice(3, 6)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]
    let date = convertDate('immaculate_baseball', parseInt(gameNumber))


    return {
        score: score,
        game: 'immaculate_baseball',
        date: date,
        gameNumber: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'immaculate_baseball:' + date
    }
}

function parseImmaculateFootball(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let score = titleArr[4].charAt(0)
    let answerArr = fullArr.slice(2, 5)
    let rarity = fullArr[1].split(' ')[1]
    let link = fullArr[6]
    let date = convertDate('immaculate_football', parseInt(gameNumber))

    return {
        score: score,
        game: 'immaculate_football',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'immaculate_football:' + date
    }
}

function parseImmaculateHockey(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let score = titleArr[4].charAt(0)
    let answerArr = fullArr.slice(2, 5)
    let rarity = fullArr[1].split(' ')[1]
    let link = fullArr[6]
    let date = convertDate('immaculate_hockey', parseInt(gameNumber))


    return {
        score: score,
        game: 'immaculate_hockey',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'immaculate_hockey:' + date
    }
}

function parseTradle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[1].slice(1)
    let score = titleArr[2].split('/')[0]
    if (score == 'X') score = 0
    let answerArr = fullArr.slice(1, fullArr.length - 1)
    let link = fullArr[fullArr.length - 1]
    let date = convertDate('tradle', parseInt(gameNumber))

    return {
        score: score,
        game: 'tradle',
        gameNumber: gameNumber,
        date: date,
        graph: answerArr,
        misc: null,
        link: link,
        slug: 'tradle:' + date
    }
}

function parseGloble(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let date = convertDate('globle', titleArr.slice(1, 4).join(' '))
    let score = fullArr[2].split(' ')[2]
    let answerArr = fullArr[2].split(' ')[0]
    let link = fullArr[4]

    return {
        score: score,
        game: 'globle',
        date: date,
        graph: answerArr,
        misc: null,
        link: link,
        slug: 'globle:' + date
    }
}

function parsePokedoku(text) {
    let fullArr = text.split(`\n`)

    let date = fullArr[1]
    let score = fullArr[3].split(' ')[1].charAt(0)
    let answerArr = fullArr.slice(6, 9)
    let rarity = fullArr[4].split(' ')[1].split('/')[0]
    let link = 'https://pokedoku.com/' + date

    return {
        score: score,
        game: 'pokedoku',
        date: date,
        graph: answerArr,
        misc: rarity,
        link: link,
        slug: 'pokedoku:' + date
    }
}

function parseCostcodle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[1].slice(1)
    let score = titleArr[2].charAt(0)
    if (score == 'X') score = 0
    let answerArr = fullArr.slice(1, fullArr.length - 1)
    let date = convertDate('costcodle', parseInt(gameNumber))

    return {
        score: score,
        game: 'costcodle',
        date: date,
        gameNumber: gameNumber,
        graph: answerArr,
        misc: null,
        link: null,
        slug: 'costcodle:' + date
    }
}

function parseCine2Nerdle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0]

    let gameNumber = titleArr.split(' ')[1].slice(1)
    let date = convertDate('cine2nerdle', parseInt(gameNumber))
    let score = fullArr[6].split(' ')[2]
    let answerArr = fullArr.slice(1, 5)

    return {
        score: score,
        game: 'cine2nerdle',
        date: date,
        gameNumber: gameNumber,
        graph: answerArr,
        misc: null,
        link: 'www.cine2nerdle.app/puzzles/original/' + gameNumber,
        slug: 'cine2nerdle:' + date
    }
}

function parseDozen(text) {
    let fullArr = text.split(`\n`)

    let gameNumber = fullArr[1].split(' ')[1]
    let date = convertDate('dozen', parseInt(gameNumber))
    let score = fullArr[3].split(' ')[1]
    let answerArr = fullArr.slice(4, 7)
    let misc = fullArr[7]

    return {
        score: score,
        game: 'dozen',
        date: date,
        gameNumber: gameNumber,
        graph: answerArr,
        misc: misc,
        link: null,
        slug: 'dozen:' + date
    }
}

function convertDate(game, text) {
    let date = null

    if (game == 'wordle') {
        date = new Date('2021-06-20')
        date.setDate(date.getDate() + text)
    } else if (game == 'connections') {
        date = new Date('2023-06-12')
        date.setDate(date.getDate() + text)
    } else if (game == 'immaculate_footy') {
        date = new Date('2023-08-19')
        date.setDate(date.getDate() + text)
    } else if (game == 'immaculate_basketball_mens') {
        date = new Date('2023-07-26')
        date.setDate(date.getDate() + text)
    } else if (game == 'immaculate_basketball_womens') {
        date = new Date('2023-08-14')
        date.setDate(date.getDate() + text)
    } else if (game == 'immaculate_baseball') {
        date = new Date('2023-04-04')
        date.setDate(date.getDate() + text)
    } else if (game == 'immaculate_football') {
        date = new Date('2023-07-20')
        date.setDate(date.getDate() + text)
    } else if (game == 'immaculate_hockey') {
        date = new Date('2023-07-27')
        date.setDate(date.getDate() + text)
    } else if (game == 'tradle') {
        date = new Date('2022-03-07')
        date.setDate(date.getDate() + text)
    } else if (game == 'globle') {
        date = new Date(text)
    } else if (game == 'pokedoku') {
        date = new Date(text)
    } else if (game == 'costcodle') {
        date = new Date('2023-09-21')
        date.setDate(date.getDate() + text)
    } else if (game == 'cine2nerdle') {
        date = new Date('2022-11-03')
        date.setDate(date.getDate() + text)
    } else if (game == 'dozen') {
        date = new Date('2023-07-24')
        date.setDate(date.getDate() + text)
    }

    return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.toDateString().slice(8, 10))
}

function pad(num) {
    return ('00' + num).slice(-2)
};
