window.onload = windowLoaded;

const state = {
  gameData: {},
  foundWords: [],
  allLetters: '',
  score: 0,
  currentInput: 'herd',
}

async function windowLoaded() {
  updateInputBox()
  const gameData = await getGame()
  console.log(gameData);
  state.gameData = gameData
  state.allLetters = state.gameData.center + state.gameData.letters
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
  document.getElementById('text-input').innerHTML = state.currentInput.toUpperCase()
}

function updateScoreBox() {
  console.log(state.score);
  document.getElementById('score-display').innerHTML = state.score
}

function typeLetter(letter) {
  letter = letter.toLowerCase()
  state.currentInput += letter
  updateInputBox()
}

function showError(message) {
  const errBox = document.getElementById('error-message')
  errBox.innerHTML = message
  errBox.classList.add('active')
  setTimeout(() => {
    const errBox = document.getElementById('error-message')
    errBox.classList.remove('active')
  }, 700);
}

function checkWord() {
  console.log(state.currentInput);
  if(state.currentInput.length < 4){
    console.log('too short');
    showError('Word too short')
  }
  else if(hasInvalidLetter(state.currentInput)){
    console.log('invalid letter');
    showError('Invalid letter')
  }
  else if(state.foundWords.includes(state.currentInput)){
    console.log('already found');
    showError('Word already found')
  }
  else if(!state.gameData.wordlist.includes(state.currentInput)){
    console.log('not on list');
    showError('Not on word list')
  }
  else{
    state.score += scoreWord(state.currentInput)
    state.foundWords.push(state.currentInput)
  }
  state.currentInput = ''
  updateInputBox()
  updateScoreBox()
}

function hasInvalidLetter(word) {
  let invalid = false
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if(!state.allLetters.includes(letter)){
      invalid = true
      break
    }
  }
  return invalid
}

function scoreWord(word) {
  let score = 0
  if(word.length === 4){
    score = 1
  }
  else{
    score = word.length
  }

  let isPanagram = true
  for(let i = 0; i < state.allLetters.length; i++){
    if(!state.currentInput.includes(state.allLetters[i])){
      isPanagram = false
    }
  }
  if(isPanagram){
    console.log('Panagram');
    score += 7
  }

  return score
}

function deleteLetter() {
  state.currentInput = state.currentInput.slice(0, -1)
  updateInputBox()
}