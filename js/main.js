'use strict'

// global vars  
const MINE = '💣'
const FLAG = '🚩'
const SMILE = '😊'
const SAD = '🥴'
const WINNER = '😎'
var gBoard
var gTimerInterval
var gLevel = {
    size: 4, // size of the table
    mines: 2, // how many mines in the board
}
var gGame = { // TODO for later 
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    isFirstClick: true,
    lives: 3,
    hints: 3,
    isHint: false,
}



function init() {
    //MODEL
    gGame.isOn = false
    gGame.isFirstClick = true
    clearInterval(gTimerInterval)
    gBoard = createBoard()
    //console.log(gBoard);
    //DOM
    //getRandomMine()
    getRandomMine()
    setMinesNegsCount(gBoard)

    randerBoard(gBoard)
    //console.log(gBoard);
}

function createBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {    //for each cell
                isShown: false,
                minesAroundCount: 0,
                isMine: false,
                isMarked: false,
            }
        }
    }
    //getRandomMine() = MINE
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
            strHTML += `\t<td id="${tdId}" class="hidden-cell"onclick="cellClicked(this,${i},${j})"
            oncontextmenu="cellMarked(event,this,${i},${j})"></td>`
            //console.log(tdId);
            //console.log(elBoard);
        }
        strHTML += `</tr>\n`
        //console.log('strHTML', strHTML);
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}


function cellClicked(elCell, i, j) {
    console.log(gBoard[i][j]);
    var currCell = gBoard[i][j]

    // check is first click
    if (gGame.isFirstClick) {
        gGame.isOn = true
        gGame.isFirstClick = false

        //expandShown(gBoard, i, j)
        startTimer()
    }
    // if game is not on return!
    if (!gGame.isOn) return

    if (gGame.isHint) {
        getNegHint(i, j) 
        gGame.isHint = false
        return
    }

    //if the current cell is alredy showen return
    if (currCell.isMarked || currCell.isShown) return
    undoSteps(gBoard[i][j])

    // update the model
    currCell.isShown = true
    gGame.shownCount++
    //console.log('gGame.shownCount', gGame.shownCount);

    //console.log(currCell);
    //update the DOM
    elCell.innerText = currCell.minesAroundCount
    elCell.classList.remove('hidden-cell')
    elCell.classList.add('shown-cell')
    // if user pressed on mine game over!
    if (currCell.isMine) {
        elCell.innerHTML = MINE
        gGame.lives--
        if (gGame.lives < 0) {
            gameOver()
            return
        }
        checkLives()
    }
    if (currCell.minesAroundCount === 0 && !currCell.isMine) expandShown(gBoard, i, j)
    checkGameOver()
}

function getNegHint(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gLevel.size) continue
            var currCell = gBoard[i][j]
            if(currCell.isShown) continue

            var id = "#" + getIdName({ i, j })
            var elNegCell = document.querySelector(id);

            
            elNegCell.innerText = currCell.minesAroundCount;
            if (currCell.isMine) {
                elNegCell.innerText = MINE
            }
            //elNegCell.style.backgroundColor = 'rgba(122, 122, 93, 0.542)'
            elNegCell.classList.remove('hidden-cell');
            elNegCell.classList.add('shown-cell');
        }
    }
    setTimeout(() => {
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gLevel.size) continue
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gLevel.size) continue
                var currCell = gBoard[i][j]
                if(currCell.isShown) continue
                var id = "#" + getIdName({ i, j })

                var elNegCell = document.querySelector(id)

                elNegCell.classList.remove('shown-cell')
                elNegCell.classList.add('hidden-cell')
                elNegCell.innerText = ''
                
            }
            //elNegCell.style.backgroundColor =  'rgba(192, 192, 150, 0.542)'
        }
    }, 1000)
}

function undoSteps(step){
    var steps = []
    steps.push(step)
    console.log(steps);
}

function getHintBtn(elBtn) {
    gGame.hints--
    elBtn.style.color = '#006E7F'
    gGame.isHint = true
    setTimeout(() => { elBtn.style.display = 'none' }, 1500)
    if (gGame.hints < 0) elBtn.innerText = '🤔'
}

function cellMarked(event, elCell, i, j) {
    if (!gGame.isOn) return
    event.preventDefault()

    var currCell = gBoard[i][j]

    if (currCell.isShown) return

    if (currCell.isMarked) {
        elCell.innerText = ''
        currCell.isMarked = false
        gGame.markedCount--
        return
    }
    if (!currCell.isMarked) {
        elCell.innerText = FLAG
        currCell.isMarked = true
        gGame.markedCount++
        console.log('gGame.markedCount', gGame.markedCount);
    }

    /*     var cellCoord = getCallCoord(elCell.id)
        //console.log(elCell.id);
        var currCell = gBoard[cellCoord.i][cellCoord.j]    
    
        if (currCell.isShown)return
         */
}

function checkLives() {

    var live = document.querySelector('h5')
    if (gGame.lives === 2) {
        live.innerText = 'Lives:' + '💔❤️❤️'
    }
    if (gGame.lives === 1) {
        live.innerText = 'Lives:' + '💔💔❤️'
    }
    if (gGame.lives === 0) {
        live.innerText = 'Lives:' + '💔💔💔'
        live.style.opacity = '0.5'

    }
}

function gameOver() {
    clearInterval(gTimerInterval)

    var restartButton = document.querySelector('.restart-button')
    restartButton.innerText = 'Try Again!' + SAD
    gGame.isOn = false

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (!currCell.isMine) continue
            currCell.isShown = true
            var id = '#' + getIdName({ i, j })
            var elCell = document.querySelector(id)
            elCell.innerText = MINE
            elCell.classList.add('shown-cell')
        }
    }
}



function getSafeClick(elBtn) {
    //console.log(elBtn);
    elBtn.removeAttribute("onClick")
    for (var i = 0; i < 1; i++) {
        elBtn.style.opacity = '0.5'
        var i = getRandomInt(0, gLevel.size - 1)
        //console.log(idxI);
        var j = getRandomInt(0, gLevel.size - 1)
        //console.log(idxJ);
        var currCell = gBoard[i][j]
        //console.log(currCell);
        if (currCell.isShown || currCell.isMine) i--

        var id = "#" + getIdName({ i, j })
        var elEmptyCell = document.querySelector(id);
        elEmptyCell.classList.remove('hidden-cell');
        elEmptyCell.classList.add('shown-cell');
        elEmptyCell.innerText = currCell.minesAroundCount;

        setTimeout(() => {
            elEmptyCell.classList.remove('shown-cell');
            elEmptyCell.classList.add('hidden-cell'), elEmptyCell.innerText = ''

        }, 680)
    }
}


function checkGameOver() {
    //console.log(gLevel.size);
    //console.log(gLevel.mines);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            //console.log(currCell);
            //console.log(currCell);
            //if (!currCell.isShown || !currCell.isMarked) return
            if (gGame.markedCount === gLevel.mines || gGame.lives < 3) {
                if (gGame.shownCount === ((gLevel.size ** 2) - gGame.markedCount)) {
                    //console.log('gLevel.size', gLevel.size);
                    console.log('gGame.markedCount', gGame.markedCount);
                    clearInterval(gTimerInterval)
                    gGame.isOn = false
                    var restartButton = document.querySelector('.restart-button')
                    restartButton.innerText = 'You got it!' + WINNER

                }
            }
        }
    }
}

function expandShown(board, IdxI, IdxJ) {
    for (var i = IdxI - 1; i <= IdxI + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = IdxJ - 1; j <= IdxJ + 1; j++) {
            var currCell = board[i][j]

            //chacking border and status
            //if (currCell.isMine) return
            if (i === IdxI && j === IdxJ) continue
            if (j < 0 || j >= board[0].length) continue
            if (currCell.isMarked || currCell.isShown) continue

            //get id by location
            var id = "#" + getIdName({ i, j })

            //model
            currCell.isShown = true
            gGame.shownCount++
            //Dom
            var elNegCell = document.querySelector(id);
            elNegCell.classList.remove('hidden-cell');
            elNegCell.classList.add('shown-cell');
            elNegCell.innerText = currCell.minesAroundCount;


            if (currCell.minesAroundCount === 0) expandShown(board, i, j)

        }
    }
}




function restartGame() {
    var elTimer = document.querySelector('.timer')
    var elBtn = document.querySelector('.restart-button')
    var elHints = document.querySelectorAll('.Hints')
    var safeClick1 = document.querySelector('.safe1')
    var safeClick2 = document.querySelector('.safe2')
    var safeClick3 = document.querySelector('.safe3')

    safeClick1.style.opacity = '1'
    safeClick1.setAttribute("onclick", "getSafeClick(this)")
    safeClick2.style.opacity = '1'
    safeClick2.setAttribute("onclick", "getSafeClick(this)")
    safeClick3.style.opacity = '1'
    safeClick3.setAttribute("onclick", "getSafeClick(this)")

    console.log(elHints);
    for (var i = 0; i < elHints.length; i++) {
        console.log(elHints[i]);
        var currHint = elHints[i]
        currHint.style.display = 'inline-block'
        currHint.style.color = 'black'

    }

    elTimer.innerText = 'Timer:00:00'
    elBtn.innerText = 'Restart me!' + SMILE
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        //isFirstClick: false, LATER
        //hints: 3, LATER
        lives: 3
    }
    var lives = document.querySelector('h5')
    lives.innerText = 'Lives:' + '❤️❤️❤️'
    lives.style.opacity = '1'

    init()

}





