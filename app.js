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
    let row = Math.floor(Math.random() * 4)
    let col = Math.floor(Math.random() * 4)
    let possibility = Math.random()
    if (possibility > 0.2) {
        if (gameboard[row][col] == "0") {
            gameboard[row][col] = "2"
        } else {
            setTimeout(randomAdd)
        }
    }
    else {
        if (gameboard[row][col] == "0") {
            gameboard[row][col] = "4"
        } else {
            setTimeout(randomAdd)
        }
    }
    setBoard()
}

function checkRandomAdd(e) {
    if (e.key == "ArrowUp") {
        let numbersOfBoardDown = []
        let up = 0
        for (let c = 0; c < gameboard.length; c++) {
            numbersOfBoardDown.push(gameboard[up][c].toString())
        }
        if (numbersOfBoardDown.includes("0") == true) {
            randomAdd()
        }
    }
    if (e.key == "ArrowDown") {
        let numbersOfBoardDown = []
        let down = gameboard.length - 1
        for (let c = 0; c < gameboard.length; c++) {
            numbersOfBoardDown.push(gameboard[down][c].toString())
        }
        if (numbersOfBoardDown.includes("0") == true) {
            randomAdd()
        }
    }
    if (e.key == "ArrowLeft") {
        let numbersOfBoardDown = []
        let left = 0
        for (let r = 0; r < gameboard.length; r++) {
            numbersOfBoardDown.push(gameboard[r][left].toString())
        }
        if (numbersOfBoardDown.includes("0") == true) {
            randomAdd()
        }
    }
    if (e.key == "ArrowRight") {
        let numbersOfBoardDown = []
        let right = gameboard.length - 1
        for (let r = 0; r < gameboard.length; r++) {
            numbersOfBoardDown.push(gameboard[r][right].toString())
        }
        if (numbersOfBoardDown.includes("0") == true) {
            randomAdd()
        }
    }
}

//keyboard events
document.addEventListener('keydown', keyFunction)

function keyFunction(e) {
    if (e.key == "ArrowUp" || e.key == "w") {
        setBoard()
        moveUp()
        setBoard()
        randomAdd(e)
    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        setBoard()
        moveDown()
        setBoard()
        randomAdd(e)
    }
    else if (e.key == "ArrowLeft" || e.key == "s") {
        setBoard()
        moveLeft()
        setBoard()
        randomAdd(e)
    }
    else if (e.key == "ArrowRight" || e.key == "s") {
        setBoard()
        moveRight()
        setBoard()
        randomAdd(e)
    }
}

//move numbers

function moveUp() {
    for (let c = 0; c < gameboard.length; c++) {
        let array = []
        for (let r = 0; r < gameboard.length; r++) {
            array.push(gameboard[r][c])
        }
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] == array[i + 1]) {
                array[i] = (parseInt(array[i]) + parseInt(array[i + 1])).toString()
                array[i + 1] = "0"
                let keepScore = parseInt(scoreValue.textContent)
                let keepBestScore = parseInt(bestScoreValue.textContent)
                keepScore += parseInt(array[i])
                scoreValue.textContent = keepScore
                if (keepBestScore < keepScore) {
                    bestScoreValue.textContent = keepScore
                }
            }
        }
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        let countRow = 0
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[countRow][c] = array[i]
            countRow += 1
        }
        for (let nr = 0; nr < gameboard.length; nr++) {
            if (gameboard[nr][c] == undefined) {
                gameboard[nr][c] = "0"
            }
        }
    }
}

function moveDown() {
    for (let c = 0; c < gameboard.length; c++) {
        let array = []
        for (let r = gameboard.length - 1; 0 <= r; r--) {
            array.push(gameboard[r][c])
        }
        //sıfırları atma
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        //toplama
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] == array[i + 1]) {
                array[i] = (parseInt(array[i]) + parseInt(array[i + 1])).toString()
                array[i + 1] = "0"
                let keepScore = parseInt(scoreValue.textContent)
                let keepBestScore = parseInt(bestScoreValue.textContent)
                keepScore += parseInt(array[i])
                scoreValue.textContent = keepScore
                if (keepBestScore < keepScore) {
                    bestScoreValue.textContent = keepScore
                }
            }
        }
        //sıfırları atma
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        //gameboard yerleştirme
        let countRow = 3
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[countRow][c] = array[i]
            countRow -= 1
        }
        //gameboard sıfır yerleştirme
        for (let nr = gameboard.length - 1; 0 <= nr; nr--) {
            if (gameboard[nr][c] == undefined) {
                gameboard[nr][c] = "0"
            }
        }
    }
}


function moveLeft() {
    for (let r = 0; r < gameboard.length; r++) {
        let array = []
        for (let c = 0; c < gameboard.length; c++) {
            array.push(gameboard[r][c])
        }
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] == array[i + 1]) {
                array[i] = (parseInt(array[i]) + parseInt(array[i + 1])).toString()
                array[i + 1] = "0"
                let keepScore = parseInt(scoreValue.textContent)
                let keepBestScore = parseInt(bestScoreValue.textContent)
                keepScore += parseInt(array[i])
                scoreValue.textContent = keepScore
                if (keepBestScore < keepScore) {
                    bestScoreValue.textContent = keepScore
                }
            }
        }
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        let countColumn = 0
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[r][countColumn] = array[i]
            countColumn += 1
        }
        for (let nc = 0; nc < gameboard.length; nc++) {
            if (gameboard[r][nc] == undefined) {
                gameboard[r][nc] = "0"
            }
        }
    }
}

function moveRight() {
    for (let r = 0; r < gameboard.length; r++) {
        let array = []
        for (let c = gameboard.length - 1; 0 <= c; c--) {
            array.push(gameboard[r][c])
        }
        console.log("ilk")
        console.log(array)
        //sıfırları atma
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        console.log("sıfır atma")
        console.log(array)
        //toplama
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] == array[i + 1]) {
                array[i] = (parseInt(array[i]) + parseInt(array[i + 1])).toString()
                array[i + 1] = "0"
            }
        }
        console.log("toplama")
        console.log(array)
        //sıfırları atma-2
        while (array.includes("0")) {
            let index = array.indexOf("0")
            array.splice(index, 1)
        }
        console.log("sıfır atma 2")
        console.log(array)
        //gameboard yerleştirme
        let countColumn = gameboard.length - 1
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[r][countColumn] = array[i]
            countColumn -= 1
        }
        console.log("yerleştirme")
        console.log(array)
        //gameboard sıfır yerleştirme
        for (let nc = 0; nc < gameboard.length; nc++) {
            if (gameboard[r][nc] == undefined) {
                gameboard[r][nc] = "0"
            }
        }
    }

}