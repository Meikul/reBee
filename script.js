window.onload = windowLoaded;

const state = {
  gameData: {},
  currentInput: '',
}

async function windowLoaded() {
  const gameData = await getGame()
  console.log(gameData);
  state.gameData = gameData
  fillHexes(state.gameData.letters, state.gameData.center)

  const hexes = document.querySelectorAll('.hex')
  hexes.forEach(hex => {
    hex.addEventListener('touchstart', hexClick)
    hex.addEventListener('touchend', hexRelease)
    hex.addEventListener('mousedown', hexClick)
    hex.addEventListener('mouseup', hexRelease)
    hex.addEventListener('mouseleave', hexRelease)
  })

  document.addEventListener('keydown', keyPress)
}

async function getGame(type = 'random') {
  if(type !== 'today' && type !== 'random') return
  // const response = fetch(`https://freebee.fun/cgi-bin/random`)
  // return (await response).json()
  const response = {
    center: "h",
    letters: "ecrdoi",
    total: 530,
    wordlist: [
    "cheder",
    "cheer",
    "cheered",
    "cheerer",
    "cheerier",
    "cheerio",
    "cheero",
    "chic",
    "chicer",
    "chichi",
    "chico",
    "chid",
    "chide",
    "chided",
    "chider",
    "chiro",
    "chirr",
    "chirre",
    "chirred",
    "choice",
    "choicer",
    "choir",
    "choired",
    "chord",
    "chorded",
    "chore",
    "chored",
    "choreic",
    "choreoid",
    "choric",
    "chorioid",
    "choroid",
    "coheir",
    "cohere",
    "cohered",
    "coherer",
    "coho",
    "cooch",
    "creche",
    "dichroic",
    "dreich",
    "eche",
    "eched",
    "echo",
    "echoed",
    "echoer",
    "echoic",
    "heder",
    "heed",
    "heeded",
    "heeder",
    "heir",
    "heired",
    "herd",
    "herded",
    "herder",
    "herdic",
    "here",
    "hero",
    "heroic",
    "herried",
    "hide",
    "hided",
    "hider",
    "hied",
    "hire",
    "hired",
    "hirer",
    "hoed",
    "hoer",
    "hooch",
    "hood",
    "hooded",
    "hoodie",
    "hoodier",
    "hoodoo",
    "hoodooed",
    "horde",
    "horded",
    "horrid",
    "horror",
    "ichor",
    "ocher",
    "ochered",
    "ochre",
    "ochred",
    "ochroid",
    "ohed",
    "oohed",
    "orchid",
    "recherche",
    "reechier",
    "reecho",
    "reechoed",
    "rehire",
    "rehired",
    "rhodic",
    "rich",
    "richer"
    ],
    words: 99,
  }
  return response
}

function fillHexes(letters, center) {
  // const centerHex = document.getElementById('hex-letter-6').innerHTML = center.toUpperCase()
  const centerHex = document.getElementById('center-hex-letter').innerHTML = center.toUpperCase()
  for (let i=0; i<letters.length; i++) {
    document.getElementById('hex-letter-'+i).innerHTML = letters[i].toUpperCase()
  }
}

function hexClick(){
  const letter = this.querySelector('.hex-letter')
  typeLetter(letter.innerHTML)
  this.classList.add('activated')
}

function hexRelease() {
   this.classList.remove('activated')
}

function keyPress(e) {
  const key = e.key.toUpperCase()
  if(/^[A-Z]$/.test(key)) typeLetter(key)
  else if(e.key === 'Enter') checkWord()
  else if (e.key === 'Backspace') deleteLetter()
}

function updateInputBox() {
  document.getElementById('text-input').innerHTML = state.currentInput
}

function typeLetter(letter) {
  letter = letter.toUpperCase()
  state.currentInput += letter
  updateInputBox()
}

function checkWord() {
  state.currentInput = ''
  updateInputBox()
}

function deleteLetter() {
  state.currentInput = state.currentInput.slice(0, -1)
  updateInputBox()
}