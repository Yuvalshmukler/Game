'use strict'

var gInitTime = Date.now()


function getMinsAroundCount(cellI, cellJ, board) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gLevel.size) continue
            if (board[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) continue
            currCell.minesAroundCount = getMinsAroundCount(i, j, board)
        }
    }
}
/* function countNeighbors(cellI, cellJ, mat) {
    var neighbors = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) return;
            neighbors.push(mat[i][j]);
            console.log(neighbors);
        }
        return neighbors
    }
     //return console.log(neighbors);
    //return neighborsCount;
}
 */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
function startTimer() {

    var startTime = Date.now()

    gTimerInterval = setInterval(() => {
        var seconds = ((Date.now() - startTime) / 1000).toFixed(2)
        var elSpan = document.querySelector('.timer')
        elSpan.innerText = 'Timer: ' + seconds

    }, 59)
}
function borderSize(elSize) {
    if (elSize === 4) {
        gLevel.size = 4
        gLevel.mines = 2

    }
    if (elSize === 8) {
        gLevel.size = 8
        gLevel.mines = 12

    }
    if (elSize === 12) {
        gLevel.size = 12
        gLevel.mines = 30

    }
    restartGame()
}

function getRandomMine() {
    for (var i = 0; i < gLevel.mines; i++) {
        var idxI = getRandomInt(0, gLevel.size - 1)
        //console.log(idxI);
        var idxJ = getRandomInt(0, gLevel.size - 1)
        //console.log(idxJ);
        if (gBoard[idxI][idxJ].isMine) {
            i--
            continue
        }
        gBoard[idxI][idxJ].isMine = true
    }

}

//restartGame()


/* function renderCell(cell) {
    // Select the elCell and set the value
    if 
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}
 */

function getIdName(location) {
    var cellId = 'cell-' + location.i + '-' + location.j;
    return cellId;
}
