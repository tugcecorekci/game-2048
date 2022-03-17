const gamePanel = document.querySelector('.gamePanel')

let gameboard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let value = gameboard[i][j]
            let cell = document.createElement('div')
            cell.setAttribute('id', numbers[value])
            gamePanel.appendChild(cell)
            if (value > 0) {
                cell.textContent = value
            }
        }
    }
    console.log(gameboard)
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
    if (gameboard[row][col] == 0) {
        gameboard[row][col] = 2
        setBoard()
    } else {
        setTimeout(randomAdd)
    }
}

//game over function
let isGameOver = false

function checkGameOver() {
    let numbersOfBoard = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            numbersOfBoard.push(gameboard[i][j])
        }
    }
    if (numbersOfBoard.includes(0) == false) {
        isGameOver = true
        console.log("game is over")
    }
}

//keyboard events
document.addEventListener('keydown', keyFunction)

function keyFunction(e) {
    if (e.key == "ArrowUp" || e.key == "w") {
        randomAdd()
        checkGameOver()
    }
}

//replace numbers

