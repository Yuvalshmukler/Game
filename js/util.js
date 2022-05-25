'use strict'


var gInitTime = Date.now()



function randomMines() {

}

function setMinesNegsCount(cellI, cellJ, board) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= size) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // if (board[cellI][cellJ] === MINE)continue /// remove zero from mine 
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= size) continue
            if (board[i][j] === MINE) neighborsCount++
            //console.log(neighborsCount);
        }
    }
    return neighborsCount;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}



//// TODO
function collectedBallSound() {
    var pop = new Audio('audio/pop.wav')
    pop.play()

}





//setInterval(timer, 25)
//// when finished do clearInterval

function timer() {
  var timer = document.querySelector('.timer')
  var miliSec = Date.now() - gInitTime
  var min = Math.floor((miliSec / 1000) / 60)
  var sec = ((miliSec / 1000) % 60).toFixed(2)
  //console.log('min', min);
  //console.log('sec', sec);
  timer.style.display = 'block'
  timer.innerHTML = `${min}:${sec}`
}
