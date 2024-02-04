const gamePanel = document.querySelector('.gamePanel')
const scoreValue = document.querySelector('#scoreValue')
const bestScoreValue = document.querySelector('#bestScoreValue')
const newGameBtns = document.querySelectorAll('#newGameBtn')
const sectionGameOver = document.querySelector('.gameOver')
const sectionWin = document.querySelector('.win')
const currentScoreTable = document.querySelector('.currentScore')
const boardPanel = document.querySelector('.boardPanel')

function createBoardCells() {
    while (boardPanel.firstChild) {
        boardPanel.removeChild(boardPanel.lastChild)
    }
    let totalCell = gameboard.length * gameboard.length
    for (let i = 0; i < totalCell; i++) {
        let cell = document.createElement('div')
        boardPanel.appendChild(cell)
    }
}

let gameboard = [
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"]
]

let gameboardChanged = [
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"],
    ["0", "0", "0", "0"]
]

let numbers = {
    0: 'num0',
    2: 'num2',
    4: 'num4',
    8: 'num8',
    16: 'num16',
    32: 'num32',
    64: 'num64',
    128: 'num128',
    256: 'num256',
    512: 'num512',
    1024: 'num1024',
    2048: 'num2048'
}

//new game
function startNewGame() {
    gameboard = [
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"]
    ]
    gameboardChanged = [
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"]
    ]
    createBoardCells()
    resetBoard()
    createBoard()
    randomAdd()
    randomAdd()
    setBoard()
    makeEqual(gameboard, gameboardChanged)
    scoreValue.textContent = "0"
    sectionGameOver.style.display = "none"
    sectionWin.style.display = "none"
}

startNewGame()

//newGame buttons click events
for (let b = 0; b < newGameBtns.length; b++) {
    newGameBtns[b].addEventListener('click', startNewGame)
}

//new game board with randoms
function resetBoard() {
    while (gamePanel.firstChild) {
        gamePanel.removeChild(gamePanel.lastChild)
    }
}

function createBoard() {
    for (let i = 0; i < gameboardChanged.length; i++) {
        for (let j = 0; j < gameboardChanged.length; j++) {
            let value = gameboardChanged[i][j]
            let cell = document.createElement('div')
            cell.setAttribute('id', numbers[value])
            gamePanel.appendChild(cell)
            if (value != "0") {
                cell.textContent = value
            }
        }
    }
}

function setBoard() {
    for (let i = 0; i < gameboardChanged.length; i++) {
        for (let j = 0; j < gameboardChanged.length; j++) {
            let value = gameboardChanged[i][j]
            let nth = (i * 4) + j + 1
            let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
            nthCell.setAttribute('id', numbers[value])
            if (value != "0") {
                nthCell.textContent = value
            }
            else {
                nthCell.textContent = ''
            }
        }
    }
}

//add new number to random cell
function randomAdd() {
    let zeroElements = []
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard.length; j++) {
            if (gameboardChanged[i][j] == 0) {
                zeroElements.push({ row: i, col: j })
            }
        }
    }
    let randomIndex = Math.floor(Math.random() * zeroElements.length)
    let possibility = Math.random()
    let row = zeroElements[randomIndex].row
    let col = zeroElements[randomIndex].col
    if (possibility < 0.2) {
        gameboardChanged[row][col] = "4"
    }
    else {
        gameboardChanged[row][col] = "2"
    }
    let nth = parseInt((parseInt(row) * 4 + parseInt(col) + 1))
    let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
    nthCell.removeAttribute('data-slideleft')
    nthCell.removeAttribute('data-pulse')
    nthCell.setAttribute('data-zoom', '')
}

//keyboard events
document.addEventListener('keydown', keyFunction)

async function reviseBoard() {
    if (isEqual(gameboard, gameboardChanged) == false) {
        setBoard()
        await function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    randomAdd()
                    resolve()
                }, 100)
            })
        }()
        setBoard()
        makeEqual(gameboard, gameboardChanged)
    }
}

async function keyFunction(e) {
    removeCellAttr()
    if (e.key == "ArrowUp" || e.key == "w") {
        moveUp()
        await reviseBoard()
    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        moveDown()
        await reviseBoard()
    }
    else if (e.key == "ArrowLeft" || e.key == "a") {
        moveLeft()
        await reviseBoard()
    }
    else if (e.key == "ArrowRight" || e.key == "f") {
        moveRight()
        await reviseBoard()
    }
    if (isWin()) {
        setTimeout(() => {
            sectionGameOver.setAttribute('data-fadeIn', '')
            sectionWin.style.display = "grid"
        }, 100)
    }
    if (isGameOver()) {
        setTimeout(() => {
            sectionGameOver.setAttribute('data-fadeIn', '')
            sectionGameOver.style.display = "grid"
        }, 100)
    }
}

//moveUp function
function moveUp() {
    moveValueUp()
    moveValueUp()
    moveValueUp()
    addEqualsUp()
    moveValueUp()
}

function moveValueUp() {
    for (let c = 0; c < gameboardChanged.length; c++) {
        for (let r = 0; r < gameboardChanged.length - 1; r++) {
            if (gameboardChanged[r][c] == "0" && gameboardChanged[r + 1][c] != "0") {
                gameboardChanged[r][c] = gameboardChanged[r + 1][c]
                gameboardChanged[r + 1][c] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                nthCell.setAttribute('data-slideup', '')
            }
        }
    }
}

function addEqualsUp() {
    let keepScore = parseInt(scoreValue.textContent)
    let keepBestScore = parseInt(bestScoreValue.textContent)
    for (let c = 0; c < gameboardChanged.length; c++) {
        for (let r = 0; r < gameboardChanged.length - 1; r++) {
            if (gameboardChanged[r][c] != "0" && gameboardChanged[r][c] == gameboardChanged[r + 1][c]) {
                gameboardChanged[r][c] = (parseInt(gameboardChanged[r][c]) + parseInt(gameboardChanged[r + 1][c])).toString()
                gameboardChanged[r + 1][c] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                addPulseAttr(nthCell, 100)
                let nthNext = nth + 4
                let nextCell = document.querySelector(`.gamePanel div:nth-child(${nthNext})`)
                nextCell.setAttribute('data-slideup', '')
                keepScore += parseInt(gameboardChanged[r][c])
                scoreValue.textContent = keepScore
                if (keepScore > keepBestScore) {
                    keepBestScore = keepScore
                    bestScoreValue.textContent = keepBestScore
                }
                let point = document.createElement('p')
                point.textContent = `+${gameboardChanged[r][c]}`
                point.setAttribute('data-score-slideup', '')
                point.setAttribute('id', 'point')
                currentScoreTable.appendChild(point)
                removePoint(currentScoreTable, point, 1000)
            }
        }
    }
}

//moveDown function
function moveDown() {
    moveValueDown()
    moveValueDown()
    moveValueDown()
    addEqualsDown()
    moveValueDown()
}

function moveValueDown() {
    for (let c = 0; c < gameboardChanged.length; c++) {
        for (let r = gameboardChanged.length - 1; 1 <= r; r--) {
            if (gameboardChanged[r][c] == "0" && gameboardChanged[r - 1][c] != "0") {
                gameboardChanged[r][c] = gameboardChanged[r - 1][c]
                gameboardChanged[r - 1][c] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                nthCell.setAttribute('data-slidedown', '')
            }
        }
    }
}

function addEqualsDown() {
    let keepScore = parseInt(scoreValue.textContent)
    let keepBestScore = parseInt(bestScoreValue.textContent)
    for (let c = 0; c < gameboardChanged.length; c++) {
        for (let r = gameboardChanged.length - 1; 1 <= r; r--) {
            if (gameboardChanged[r][c] != "0" && gameboardChanged[r][c] == gameboardChanged[r - 1][c]) {
                gameboardChanged[r][c] = (parseInt(gameboardChanged[r][c]) + parseInt(gameboardChanged[r - 1][c])).toString()
                gameboardChanged[r - 1][c] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                addPulseAttr(nthCell, 100)
                let nthNext = nth - 4
                let nextCell = document.querySelector(`.gamePanel div:nth-child(${nthNext})`)
                nextCell.setAttribute('data-slidedown', '')
                keepScore += parseInt(gameboardChanged[r][c])
                scoreValue.textContent = keepScore
                if (keepScore > keepBestScore) {
                    keepBestScore = keepScore
                    bestScoreValue.textContent = keepBestScore
                }
                let point = document.createElement('p')
                point.textContent = `+${gameboardChanged[r][c]}`
                point.setAttribute('data-score-slideup', '')
                point.setAttribute('id', 'point')
                currentScoreTable.appendChild(point)
                removePoint(currentScoreTable, point, 1000)
            }
        }
    }
}

//moveLeft function
function moveLeft() {
    moveValueLeft()
    moveValueLeft()
    moveValueLeft()
    addEqualsLeft()
    moveValueLeft()
}

function moveValueLeft() {
    for (let r = 0; r < gameboardChanged.length; r++) {
        for (let c = 0; c < gameboardChanged.length - 1; c++) {
            if (gameboardChanged[r][c] == "0" && gameboardChanged[r][c + 1] != "0") {
                gameboardChanged[r][c] = gameboardChanged[r][c + 1]
                gameboardChanged[r][c + 1] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                nthCell.setAttribute('data-slideleft', '')
            }
        }
    }
}

function addEqualsLeft() {
    let keepScore = parseInt(scoreValue.textContent)
    let keepBestScore = parseInt(bestScoreValue.textContent)
    for (let r = 0; r < gameboardChanged.length; r++) {
        for (let c = 0; c < gameboardChanged.length - 1; c++) {
            if (gameboardChanged[r][c] != "0" && gameboardChanged[r][c] == gameboardChanged[r][c + 1]) {
                gameboardChanged[r][c] = (parseInt(gameboardChanged[r][c]) + parseInt(gameboardChanged[r][c + 1])).toString()
                gameboardChanged[r][c + 1] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                addPulseAttr(nthCell, 100)
                let nthNext = nth + 1
                let nextCell = document.querySelector(`.gamePanel div:nth-child(${nthNext})`)
                nextCell.setAttribute('data-slideleft', '')
                keepScore += parseInt(gameboardChanged[r][c])
                scoreValue.textContent = keepScore
                if (keepScore > keepBestScore) {
                    keepBestScore = keepScore
                    bestScoreValue.textContent = keepBestScore
                }
                let point = document.createElement('p')
                point.textContent = `+${gameboardChanged[r][c]}`
                point.setAttribute('data-score-slideup', '')
                point.setAttribute('id', 'point')
                currentScoreTable.appendChild(point)
                removePoint(currentScoreTable, point, 1000)
            }
        }
    }
}

//moveRight function
function moveRight() {
    moveValueRight()
    moveValueRight()
    moveValueRight()
    addEqualsRight()
    moveValueRight()
}

function moveValueRight() {
    for (let r = 0; r < gameboardChanged.length; r++) {
        for (let c = gameboardChanged.length - 1; 1 <= c; c--) {
            if (gameboardChanged[r][c] == "0" && gameboardChanged[r][c - 1] != "0") {
                gameboardChanged[r][c] = gameboardChanged[r][c - 1]
                gameboardChanged[r][c - 1] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                nthCell.setAttribute('data-slideright', '')
            }
        }
    }
}

function addEqualsRight() {
    let keepScore = parseInt(scoreValue.textContent)
    let keepBestScore = parseInt(bestScoreValue.textContent)
    for (let r = 0; r < gameboardChanged.length; r++) {
        for (let c = gameboardChanged.length - 1; 1 <= c; c--) {
            if (gameboardChanged[r][c] != "0" && gameboardChanged[r][c] == gameboardChanged[r][c - 1]) {
                gameboardChanged[r][c] = (parseInt(gameboardChanged[r][c]) + parseInt(gameboardChanged[r][c - 1])).toString()
                gameboardChanged[r][c - 1] = "0"
                let nth = (r * 4) + c + 1
                let nthCell = document.querySelector(`.gamePanel div:nth-child(${nth})`)
                addPulseAttr(nthCell, 100)
                let nthNext = nth - 1
                let nextCell = document.querySelector(`.gamePanel div:nth-child(${nthNext})`)
                nextCell.setAttribute('data-slideright', '')
                keepScore += parseInt(gameboardChanged[r][c])
                scoreValue.textContent = keepScore
                if (keepScore > keepBestScore) {
                    keepBestScore = keepScore
                    bestScoreValue.textContent = keepBestScore
                }
                let point = document.createElement('p')
                point.textContent = `+${gameboardChanged[r][c]}`
                point.setAttribute('data-score-slideup', '')
                point.setAttribute('id', 'point')
                currentScoreTable.appendChild(point)
                removePoint(currentScoreTable, point, 1000)
            }
        }
    }
}

//move functions
function removeCellAttr() {
    let cells = gamePanel.childNodes
    for (let cell = 0; cell < cells.length; cell++) {
        cells[cell].removeAttribute('data-slideup')
        cells[cell].removeAttribute('data-slidedown')
        cells[cell].removeAttribute('data-slideleft')
        cells[cell].removeAttribute('data-slideright')
        cells[cell].removeAttribute('data-pulse')
        cells[cell].removeAttribute('data-zoom')
    }
}

function addPulseAttr(nthCell, speed) {
    setTimeout(function () {
        nthCell.removeAttribute('data-slideup')
        nthCell.removeAttribute('data-slidedown')
        nthCell.removeAttribute('data-slideleft')
        nthCell.removeAttribute('data-slideright')
        nthCell.removeAttribute('data-zoom')
        nthCell.setAttribute('data-pulse', '')
    }, speed)
}

function removePoint(table, point, speed) {
    setTimeout(function () {
        table.removeChild(point)
    }, speed)
}

//equality functions
function isEqual(x, y) {
    for (i = 0; i < x.length; i++) {
        for (j = 0; j < x[0].length; j++) {
            if (x[i][j] != y[i][j]) {
                return false
            }
        }
    }
    return true
}

function makeEqual(x, y) {
    for (let r = 0; r < x.length; r++) {
        for (let c = 0; c < x.length; c++) {
            x[r][c] = y[r][c]
        }
    }
}

//game over or win functions
function isGameOver() {
    // left-to-right check
    for (let row = 0; row < gameboardChanged.length; row++) {
        for (let col = 0; col < gameboardChanged.length - 1; col++) {
            if (gameboardChanged[row][col] == gameboardChanged[row][col + 1] || gameboardChanged[row][col] == "0" || gameboardChanged[row][col + 1] == "0") {
                return false
            }
        }
    }
    // up-to-bottom check
    for (let col = 0; col < gameboardChanged.length; col++) {
        for (let row = 0; row < gameboardChanged.length - 1; row++) {
            if (gameboardChanged[row][col] == gameboardChanged[row+1][col] || gameboardChanged[row][col] == "0" || gameboardChanged[row][col + 1] == "0") {
                return false
            }
        }
    }
    return true
}

function isWin() {
    let gameboardElements = gameboardChanged.flat()
    if (gameboardElements.includes('2048')) {
        return true
    }
}