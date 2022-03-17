const gamePanel = document.querySelector('.gamePanel')

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

//set first numbers at two random places at beginning
randomAdd()
randomAdd()

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
setBoard()

function resetBoard() {
    while (gamePanel.firstChild) {
        gamePanel.removeChild(gamePanel.lastChild)
    }
}

//add new number to random cell
function randomAdd() {
    let row = Math.floor(Math.random() * 4)
    let col = Math.floor(Math.random() * 4)
    if (gameboard[row][col] == "0") {
        gameboard[row][col] = "2"
    } else {
        setTimeout(randomAdd)
    }
    setBoard()
}

//game over function - note: update - if operation still possible, not game over.
let isGameOver = false

function checkGameOver() {
    let numbersOfBoard = []
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard.length; j++) {
            numbersOfBoard.push(gameboard[i][j].toString())
        }
    }
    if (numbersOfBoard.includes("0") == false) {
        isGameOver = true
        console.log("game is over")
    }
}

//keyboard events
document.addEventListener('keydown', keyFunction)

function keyFunction(e) {
    console.log(e.key)
    if (e.key == "ArrowUp" || e.key == "w") {
        checkGameOver()
        moveUp()
        randomAdd()
    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        checkGameOver()
        moveDown()
        randomAdd()
    }
    else if (e.key == "ArrowLeft" || e.key == "s") {
        checkGameOver()
        moveLeft()
        randomAdd()
    }
    else if (e.key == "ArrowRight" || e.key == "s") {
        checkGameOver()
        moveRight()
        randomAdd()
    }
}

//move numbers

let flag = false

function moveUp() {
    setBoard()
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 1; j < 4; j++) {
            flag = false
            if (gameboard[j][i] == gameboard[j - 1][i] && flag == false) {
                gameboard[j - 1][i] = parseInt(gameboard[j][i]) + parseInt(gameboard[j - 1][i])
                gameboard[j][i] = "0"
            }
            else if (gameboard[j - 1][i] == "0" && flag == false) {
                gameboard[j - 1][i] = gameboard[j][i]
                gameboard[j][i] = "0"
                setTimeout(moveUp)
            }
        }
        flag = true
    }
}

function moveDown() {
    setBoard()
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 1; j < 4; j++) {
            flag = false
            if (gameboard[j][i] == gameboard[j - 1][i] && flag == false) {
                gameboard[j - 1][i] = parseInt(gameboard[j][i]) + parseInt(gameboard[j - 1][i])
                gameboard[j][i] = "0"
            }
            else if (gameboard[j - 1][i] == "0" && flag == false) {
                gameboard[j - 1][i] = gameboard[j][i]
                gameboard[j][i] = "0"
                setTimeout(moveUp)
            }
        }
        flag = true
    }
}

function moveLeft() {
}

function moveRight() {
}