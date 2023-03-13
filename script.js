const selectBox = document.querySelector('.select-box'),
  selectX = selectBox.querySelector('.playerX'),
  selectO = selectBox.querySelector('.playerO')
const playBoard = document.querySelector('.play-board')
const allBox = document.querySelectorAll('section span')
const players = document.querySelector('.players')

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

// human click function
function clickedBox(element) {
  if (players.classList.contains('player')) {
    element.innerHTML = `<i class="${playerO}"></i>`
    players.classList.add('active')
  } else {
    element.innerHTML = `<i class="${playerX}"></i>`
    players.classList.add('active')
  }
  element.style.pointerEvents = 'none' //avoid the overwriting of box element
  setTimeout(() => {
    // delay for more realism
    bot()
  }, 1000)
}

// bot click function
function bot() {
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
    } else {
      allBox[randomBox].innerHTML = `<i class="${playerO}"></i>`
      players.classList.remove('active')
    }
  }
  allBox[randomBox].style.pointerEvents = 'none'
}
