'use strict'

// global vars  
const MINE = '💣'
const FLAG = '🚩'
var size = 4
var gBoard

//const MINE_IMG = '<img src="img/mine.png" />'

//const MINE_IMG = '<img src="img/mine.png" />'

/////
var gLevels = {
    size: 4, // size of the table
    mines: 2 // how many mines in the board
}
/////
var gGame = { // TODO for later 
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function init() {
    //MODEL
    gBoard = createBoard()

    //console.log(gBoard);
    //DOM
    randerBoard(gBoard)
}

function createBoard() {
    var size = 4
    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {    //for each cell
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
            }
            //var currCell = board[i][j]

        }
    }
    //getRandomMine() = MINE

    board[0][2] = MINE
    board[2][2] = MINE

    console.table(board)
    return board

}

function randerBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var tdId = 'cell-' + i + '-' + j
            strHTML += `\t<td id="${tdId}" onclick="cellClicked(this, ${i},${j})"
            oncontextmenu="cellMarked(event,this)">`
            //console.log(tdId);

            var elBoard = document.querySelector('.board')
            elBoard.innerHTML = strHTML
            //console.log(elBoard);

            if (cell === MINE) {
                strHTML += MINE
            }

        }
        strHTML += `</tr>\n`
        //console.log('strHTML', strHTML);
    }


}

function cellClicked(elCell, i, j) {
    elCell.innerText = setMinesNegsCount(i, j, gBoard)
    //console.log(elCell);

    gBoard[i][j].isShown = true /// check later!! not working!!!

    console.log('elCell', elCell);
    console.log(gBoard);
}


getRandomMine()
function getRandomMine() { ////??
    var iIdx = []
    iIdx.push(getRandomInt(0, gLevels.size - 1));
    //console.log(iIdx);
    var jIdx = []
    jIdx.push(getRandomInt(0, gLevels.size ** 2));
    //console.log(size**2);

    return iIdx, jIdx;
}


function cellMarked(event, elCell) {
    //event.preventDefult();
}





/* 
getEmptyCells(gBoard)

function getEmptyCells(gBoard) {
    var emptyCells = []
    for (var i = 0; i < gBoard; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            if (gBoard[i][j] !== MINE) {

                var currCellPos = { i, j }
                //var currCell = gBoard[i][j]
                emptyCells.push(currCellPos)
            }
        }
    }
    console.log(emptyCells);
    return emptyCells
}
 */

/* function placeRandomMine(numOfMine) {
    var randomPos = []
    var empties = getEmptyCells(gBoard)
    //console.log('empties', empties);

    for (var i = 0; i < numOfMine; i++) {
        var randIdx = getRandomInt(0, empties.length)
        //console.log('randIdx', randIdx);
        randomPos.push(randIdx)
        // console.log(randomPos);
    }
    return randomPos
}
 */
