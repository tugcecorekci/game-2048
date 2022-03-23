const gamePanel = document.querySelector('.gamePanel')
const scoreValue = document.querySelector('#scoreValue')
const bestScoreValue = document.querySelector('#bestScoreValue')
const newGameBtn = document.querySelector('.newGameBtn')

newGameBtn.addEventListener('click', startNewGame)

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
    randomAdd()
    randomAdd()
    makeEqual(gameboard, gameboardChanged)
    setBoard()
    scoreValue.textContent = "0"
}

startNewGame()

//set numbers from gameboard array to board
function setBoard() {
    resetBoard()
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard.length; j++) {
            let value = gameboard[i][j]
            let cell = document.createElement('div')
            cell.setAttribute('id', numbers[value])
            gamePanel.appendChild(cell)
            if (value != "0") {
                cell.textContent = value
            }
        }
    }
}

function resetBoard() {
    while (gamePanel.firstChild) {
        gamePanel.removeChild(gamePanel.lastChild)
    }
}

//add new number to random cell
function randomAdd() {
    let zeroElements = []
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard.length; j++) {
            if (gameboardChanged[i][j] == 0) {
                zeroElements.push({ row: i, column: j })
            }
        }
    }
    let randomIndex = Math.floor(Math.random() * zeroElements.length)
    let possibility = Math.random()
    if (possibility < 0.1) {
        gameboardChanged[zeroElements[randomIndex].row][zeroElements[randomIndex].column] = "4"
    }
    else {
        gameboardChanged[zeroElements[randomIndex].row][zeroElements[randomIndex].column] = "2"
    }
}

//is equal
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

//keyboard events
document.addEventListener('keydown', keyFunction)

function keyFunction(e) {
    if (e.key == "ArrowUp" || e.key == "w") {
        moveUp()
        if (isEqual(gameboard, gameboardChanged) == false) {
            randomAdd()
            makeEqual(gameboard, gameboardChanged)
            setBoard()
        }
    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        moveDown()
        if (isEqual(gameboard, gameboardChanged) == false) {
            randomAdd()
            makeEqual(gameboard, gameboardChanged)
            setBoard()
        }
    }
    else if (e.key == "ArrowLeft" || e.key == "s") {
        moveLeft()
        if (isEqual(gameboard, gameboardChanged) == false) {
            randomAdd()
            makeEqual(gameboard, gameboardChanged)
            setBoard()
        }
    }
    else if (e.key == "ArrowRight" || e.key == "s") {
        moveRight()
        if (isEqual(gameboard, gameboardChanged) == false) {
            randomAdd()
            makeEqual(gameboard, gameboardChanged)
            setBoard()
        }
    }
    if (isGameOver()) {
        console.log("game is over")
    }
}

//move functions
function spliceZero(array) {
    while (array.includes("0")) {
        let index = array.indexOf("0")
        array.splice(index, 1)
    }
}

function updateScore(array, i) {
    let keepScore = parseInt(scoreValue.textContent)
    let keepBestScore = parseInt(bestScoreValue.textContent)
    keepScore += parseInt(array[i])
    scoreValue.textContent = keepScore
    if (keepBestScore < keepScore) {
        bestScoreValue.textContent = keepScore
    }
}

function addCells(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] == array[i + 1]) {
            array[i] = (parseInt(array[i]) + parseInt(array[i + 1])).toString()
            array[i + 1] = "0"
            updateScore(array, i)
        }
    }
}


//move function keys
function moveUp() {
    for (let c = 0; c < gameboardChanged.length; c++) {
        let array = []
        for (let r = 0; r < gameboardChanged.length; r++) {
            array.push(gameboardChanged[r][c])
        }
        spliceZero(array)
        addCells(array)
        spliceZero(array)
        let countRow = 0
        for (let i = 0; i < gameboardChanged.length; i++) {
            gameboardChanged[countRow][c] = array[i]
            countRow += 1
        }
        for (let nr = 0; nr < gameboardChanged.length; nr++) {
            if (gameboardChanged[nr][c] == undefined) {
                gameboardChanged[nr][c] = "0"
            }
        }
    }
}

function moveDown() {
    for (let c = 0; c < gameboardChanged.length; c++) {
        let array = []
        for (let r = gameboardChanged.length - 1; 0 <= r; r--) {
            array.push(gameboardChanged[r][c])
        }
        spliceZero(array)
        addCells(array)
        spliceZero(array)
        let countRow = 3
        for (let i = 0; i < gameboardChanged.length; i++) {
            gameboardChanged[countRow][c] = array[i]
            countRow -= 1
        }
        for (let nr = gameboardChanged.length - 1; 0 <= nr; nr--) {
            if (gameboardChanged[nr][c] == undefined) {
                gameboardChanged[nr][c] = "0"
            }
        }
    }
}

function moveLeft() {
    for (let r = 0; r < gameboardChanged.length; r++) {
        let array = []
        for (let c = 0; c < gameboardChanged.length; c++) {
            array.push(gameboardChanged[r][c])
        }
        spliceZero(array)
        addCells(array)
        spliceZero(array)
        let countColumn = 0
        for (let i = 0; i < gameboardChanged.length; i++) {
            gameboardChanged[r][countColumn] = array[i]
            countColumn += 1
        }
        for (let nc = 0; nc < gameboardChanged.length; nc++) {
            if (gameboardChanged[r][nc] == undefined) {
                gameboardChanged[r][nc] = "0"
            }
        }
    }
}

function moveRight() {
    for (let r = 0; r < gameboardChanged.length; r++) {
        let array = []
        for (let c = gameboardChanged.length - 1; 0 <= c; c--) {
            array.push(gameboardChanged[r][c])
        }
        spliceZero(array)
        addCells(array)
        spliceZero(array)
        let countColumn = gameboardChanged.length - 1
        for (let i = 0; i < gameboardChanged.length; i++) {
            gameboardChanged[r][countColumn] = array[i]
            countColumn -= 1
        }
        for (let nc = 0; nc < gameboardChanged.length; nc++) {
            if (gameboardChanged[r][nc] == undefined) {
                gameboardChanged[r][nc] = "0"
            }
        }
    }
}

//is game over

function isGameOver() {
    for (let row = 0; row < gameboardChanged.length; row++) {
        for (let col = 0; col < gameboardChanged.length - 1; col++) {
            if (gameboardChanged[row][col] == gameboardChanged[row][col + 1] || gameboardChanged[row][col] == "0" || gameboardChanged[row][col + 1] == "0") {
                return false
            }
        }
    }
    for (let col = 0; col < gameboardChanged.length - 1; col++) {
        for (let row = 0; row < gameboardChanged.length; row++) {
            if (gameboardChanged[row][col] == gameboardChanged[row][col + 1] || gameboardChanged[row][col] == "0" || gameboardChanged[row][col + 1] == "0") {
                return false
            }
        }
    }
    return true
}