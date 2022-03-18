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
setBoard()
console.log("hello")
console.log(gameboard)

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
    if (e.key == "ArrowUp" || e.key == "w") {

    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        checkGameOver()
        setBoard()
        moveDown()
        checkRandomAdd(e)
    }
    else if (e.key == "ArrowLeft" || e.key == "s") {

    }
    else if (e.key == "ArrowRight" || e.key == "s") {

    }
}

//move numbers

function moveUp() {
}

function moveDown() {
    for (let c = 0; c < gameboard.length; c++) {
        let array = []
        for (let r = 3; 0 <= r; r--) {
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
            }
        }
        console.log("toplama")
        console.log(array)
        //gameboard yerleştirme
        let countRow = 3
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[countRow][c] = array[i]
            countRow -= 1
        }
        console.log("toplama")
        console.log(array)
        console.log(gameboard)
        //gameboard sıfır yerleştirme
        for (let nr = 3; 0 <= nr; nr--) {
            if (gameboard[nr][c] == undefined) {
                gameboard[nr][c] = "0"
            }
        }
    }
}

function moveLeft() {
}

function moveRight() {
}