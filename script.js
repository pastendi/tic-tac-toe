const selectBox = document.querySelector('.select-box'),
  selectX = selectBox.querySelector('.playerX'),
  selectO = selectBox.querySelector('.playerO')
const playBoard = document.querySelector('.play-board')
const allBox = document.querySelectorAll('section span')
const players = document.querySelector('.players')
const resultBox = document.querySelector('.result-box')
const wonText = resultBox.querySelector('.won-text')
const replayBtn = resultBox.querySelector('.btn')

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute('onclick', 'clickedBox(this)')
  }
  selectX.onclick = () => {
    selectBox.classList.add('hide')
    playBoard.classList.add('show')
  }
  selectO.onclick = () => {
    selectBox.classList.add('hide')
    playBoard.classList.add('show')
    players.setAttribute('class', 'players active player')
  }
}
let playerX = 'fas fa-times'
let playerO = 'far fa-circle'
let playerSign = ''
let runBot = true

// human click function
function clickedBox(element) {
  playerSign = 'X'
  if (players.classList.contains('player')) {
    element.innerHTML = `<i class="${playerO}"></i>`
    players.classList.add('active')
    playerSign = 'O'
    element.setAttribute('id', playerSign)
  } else {
    element.innerHTML = `<i class="${playerX}"></i>`
    players.classList.add('active')
    element.setAttribute('id', playerSign)
  }
  selectWinner()
  playBoard.style.pointerEvents = 'none' //stop user to select more than one during the delay of bot
  element.style.pointerEvents = 'none' //avoid the overwriting of box element
  setTimeout(() => {
    // delay for more realism
    bot(runBot)
  }, 1000)
}

// bot click function
function bot(runBot) {
  if (runBot) {
    playerSign = 'O'
    let array = []
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i)
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]
    if (array.length > 0) {
      if (players.classList.contains('player')) {
        allBox[randomBox].innerHTML = `<i class="${playerX}"></i>`
        players.classList.remove('active')
        playerSign = 'X'
        allBox[randomBox].setAttribute('id', playerSign)
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerO}"></i>`
        players.classList.remove('active')
        allBox[randomBox].setAttribute('id', playerSign)
      }
      selectWinner()
    }
    playBoard.style.pointerEvents = 'auto' //stop user to select more than one during the delay of bot
    allBox[randomBox].style.pointerEvents = 'none'
  }
}

// finding winner
function getClass(idname) {
  return document.querySelector('.box' + idname).id
}
function checkClass(val1, val2, val3, sign) {
  if (
    getClass(val1) == sign &&
    getClass(val2) == sign &&
    getClass(val3) == sign
  ) {
    return true
  }
}
function selectWinner() {
  if (
    checkClass(1, 2, 3, playerSign) ||
    checkClass(4, 5, 6, playerSign) ||
    checkClass(7, 8, 9, playerSign) ||
    checkClass(1, 4, 7, playerSign) ||
    checkClass(2, 5, 8, playerSign) ||
    checkClass(3, 6, 9, playerSign) ||
    checkClass(1, 5, 9, playerSign) ||
    checkClass(3, 5, 7, playerSign)
  ) {
    runBot = false
    wonText.innerHTML = `Player
    <p>${playerSign}</p>
    won the game!`
    setTimeout(() => {
      playBoard.classList.remove('show')
      resultBox.classList.add('show')
    }, 700)
  } else {
    let allBoxFilled = true
    for (let i = 1; i <= 9; i++) {
      if (getClass(i) == '') {
        allBoxFilled = false
      }
    }
    if (allBoxFilled) {
      runBot = false
      wonText.innerHTML = `Match draw`
      setTimeout(() => {
        playBoard.classList.remove('show')
        resultBox.classList.add('show')
      }, 700)
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload()
}
