// Helpers
function parseScore(text) {
    if (text.indexOf('Wordle') != -1) {
        return parseWordle(text)
    } else if (text.indexOf('Connections') != -1) {
        return parseConnections(text)
    } else if (text.indexOf('https://www.immaculatefooty.com') != -1) {
        return parseImmaculateFooty(text)
    } else if (text.indexOf('https://www.immaculatefooty.com/basketball/mens') != -1) {
        return parseImmaculateBasketballMens(text)
    } else if (text.indexOf('https://immaculategrid.com/basketball/womens') != -1) {
        return parseImmaculateBasketballWomens(text)
    } else if (text.indexOf('https://immaculategrid.com/football') != -1) {
        return parseImmaculateFootball(text)
    } else if (text.indexOf('https://immaculategrid.com/grid') != -1) {
        return parseImmaculateBaseball(text)
    } else if (text.indexOf('https://www.immaculatefooty.com/hockey') != -1) {
        return parseImmaculateHockey(text)
    } else if (text.indexOf('https://games.oec.world/en/tradle') != -1) {
        return parseTradle(text)
    } else if (text.indexOf('https://globle-game.com') != -1) {
        return parseGloble(text)
    } else if (text.indexOf('https://pokedoku.com') != -1) {
        return parsePokedoku(text)
    } else if (text.indexOf('https://costcodle.com') != -1) {
        return parseCostcodle(text)
    } else if (text.indexOf('www.cinenerdle2.app') != -1) {
        return parseCine2Nerdle(text)
    } else if (text.indexOf('DailyDozenTrivia.com') != -1) {
        return parseCine2Nerdle(text)
    }
}

function parseWordle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[0]
    let answerArr = fullArr.slice(2)
    let score = answerArr.length

    return {
        score: score,
        game: 'wordle',
        date: gameNumber,
        graph: answerArr,
        misc: null,
        link: null
    }
}

function parseConnections(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[1].split(' ')

    let gameNumber = titleArr[1].substring(1)
    let answerArr = fullArr.slice(2)
    let score = answerArr.length

    return {
        score: score,
        game: 'connections',
        date: gameNumber,
        graph: answerArr,
        misc: null,
        link: null
    }
}

function parseImmaculateFooty(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let answerArr = fullArr.slice(3, 6)
    let score = answerArr.length[4].charAt(0)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]

    return {
        score: score,
        game: 'immaculate_footy',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
    }
}

function parseImmaculateFooty(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let answerArr = fullArr.slice(3, 6)
    let score = answerArr.length[4].charAt(0)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]


    return {
        score: score,
        game: 'immaculate_basketball_mens',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
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

    return {
        score: score,
        game: 'immaculate_basketball_womens',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
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

    return {
        score: score,
        game: 'immaculate_baseball',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
    }
}

function parseImmaculateFootball(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let score = titleArr[4].charAt(0)
    let answerArr = fullArr.slice(3, 6)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]

    return {
        score: score,
        game: 'immaculate_football',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
    }
}

function parseImmaculateHockey(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[3]
    let score = titleArr[4].charAt(0)
    let answerArr = fullArr.slice(3, 6)
    let rarity = fullArr[2].split(' ')[1]
    let link = fullArr[7]

    return {
        score: score,
        game: 'immaculate_hockey',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
    }
}

function parseTradle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr[1].slice(1)
    let score = titleArr[2].charAt(0)
    let answerArr = fullArr.slice(1, fullArr.length - 1)
    let link = fullArr[fullArr.length - 1]

    return {
        score: score,
        game: 'tradle',
        date: gameNumber,
        graph: answerArr,
        misc: null,
        link: link
    }
}

function parseGloble(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0].split(' ')

    let gameNumber = titleArr.slice(1, 4).join(' ')
    let score = fullArr[2].split(' ')[2]
    let answerArr = fullArr[2].split(' ')[0]
    let link = fullArr[4]

    return {
        score: score,
        game: 'globle',
        date: gameNumber,
        graph: answerArr,
        misc: null,
        link: link
    }
}

function parsePokedoku(text) {
    let fullArr = text.split(`\n`)

    let gameNumber = fullArr[1]
    let score = fullArr[3].split(' ')[1].charAt(0)
    let answerArr = fullArr.slice(6, 9)
    let rarity = fullArr[4].split(' ')[1].split('/')[0]
    let link = 'https://pokedoku.com/' + gameNumber

    return {
        score: score,
        game: 'pokedoku',
        date: gameNumber,
        graph: answerArr,
        misc: rarity,
        link: link
    }
}

function parseCostcodle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0]

    let gameNumber = titleArr.split(' ')[1].slice(1)
    let score = titleArr.splice(' ')[2].charAt(0)
    let answerArr = fullArr[1]

    return {
        score: score,
        game: 'costcodle',
        date: gameNumber,
        graph: answerArr,
        misc: null,
        link: null
    }
}

function parseCine2Nerdle(text) {
    let fullArr = text.split(`\n`)
    let titleArr = fullArr[0]

    let gameNumber = titleArr.split(' ')[1].slice(1)
    let score = fullArr[6].split(' ')[2]
    let answerArr = fullArr.slice(1, 5)

    return {
        score: score,
        game: 'costcodle',
        date: gameNumber,
        graph: answerArr,
        misc: null,
        link: null
    }
}

function parseDozen(text) {
    let fullArr = text.split(`\n`)

    let gameNumber = fullArr[1].split(' ')[1]
    let score = fullArr[3].split(' ')[2]
    let answerArr = fullArr.slice(4, 7)
    let misc = fullArr[7]

    return {
        score: score,
        game: 'costcodle',
        date: gameNumber,
        graph: answerArr,
        misc: misc,
        link: null
    }
}