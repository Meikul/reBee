window.onload = windowLoaded;

const state = {
  gameData: {},
  foundWords: [],
  allLetters: '',
  score: 0,
  currentInput: 'herd',
}

async function windowLoaded() {
  const gameData = await getGame()
  console.log(gameData);
  state.gameData = gameData
  state.allLetters = state.gameData.center + state.gameData.letters
  fillHexes(state.gameData.letters, state.gameData.center)

  const hexes = document.querySelectorAll('.hex')
  hexes.forEach(hex => {
    hex.addEventListener('touchstart', hexPress)
    hex.addEventListener('touchend', hexRelease)
    hex.addEventListener('mousedown', hexPress)
    hex.addEventListener('mouseup', hexRelease)
    hex.addEventListener('mouseleave', hexRelease)
  })
  document.addEventListener('keydown', keyPress)
  updateInputBox()
  updateScore()
}

async function getGame(type = 'random') {
  if(type !== 'today' && type !== 'random') return
  // const response = fetch(`https://freebee.fun/cgi-bin/random`)
  const response = fetch(`https://freebee.fun/play/today`)
  return (await response).json()
  // const response = {
  //   center: "h",
  //   letters: "ecrdoi",
  //   total: 530,
  //   wordlist: [
  //   "cheder",
  //   "cheer",
  //   "cheered",
  //   "cheerer",
  //   "cheerier",
  //   "cheerio",
  //   "cheero",
  //   "chic",
  //   "chicer",
  //   "chichi",
  //   "chico",
  //   "chid",
  //   "chide",
  //   "chided",
  //   "chider",
  //   "chiro",
  //   "chirr",
  //   "chirre",
  //   "chirred",
  //   "choice",
  //   "choicer",
  //   "choir",
  //   "choired",
  //   "chord",
  //   "chorded",
  //   "chore",
  //   "chored",
  //   "choreic",
  //   "choreoid",
  //   "choric",
  //   "chorioid",
  //   "choroid",
  //   "coheir",
  //   "cohere",
  //   "cohered",
  //   "coherer",
  //   "coho",
  //   "cooch",
  //   "creche",
  //   "dichroic",
  //   "dreich",
  //   "eche",
  //   "eched",
  //   "echo",
  //   "echoed",
  //   "echoer",
  //   "echoic",
  //   "heder",
  //   "heed",
  //   "heeded",
  //   "heeder",
  //   "heir",
  //   "heired",
  //   "herd",
  //   "herded",
  //   "herder",
  //   "herdic",
  //   "here",
  //   "hero",
  //   "heroic",
  //   "herried",
  //   "hide",
  //   "hided",
  //   "hider",
  //   "hied",
  //   "hire",
  //   "hired",
  //   "hirer",
  //   "hoed",
  //   "hoer",
  //   "hooch",
  //   "hood",
  //   "hooded",
  //   "hoodie",
  //   "hoodier",
  //   "hoodoo",
  //   "hoodooed",
  //   "horde",
  //   "horded",
  //   "horrid",
  //   "horror",
  //   "ichor",
  //   "ocher",
  //   "ochered",
  //   "ochre",
  //   "ochred",
  //   "ochroid",
  //   "ohed",
  //   "oohed",
  //   "orchid",
  //   "recherche",
  //   "reechier",
  //   "reecho",
  //   "reechoed",
  //   "rehire",
  //   "rehired",
  //   "rhodic",
  //   "rich",
  //   "richer"
  //   ],
  //   words: 99,
  // }
  // return response
}

function fillHexes(letters, center) {
  const centerHex = document.getElementById('center-hex-letter').innerHTML = center.toUpperCase()
  for (let i=0; i<letters.length; i++) {
    document.getElementById('hex-letter-'+i).innerHTML = letters[i].toUpperCase()
  }
}

function hexPress(e){
  e.preventDefault()
  const letter = this.querySelector('.hex-letter')
  typeLetter(letter.innerHTML)
  this.classList.add('activated')
}

function hexRelease() {
  if(this.classList.contains('activated')){
    this.classList.remove('activated')
  }
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

function appendWordList(word) {
  document.getElementById('word-count-number').innerHTML = state.foundWords.length

  const capitalizedWord = word[0].toUpperCase() + word.slice(1)

  const list = document.getElementById('found-list')
  const entry = document.createElement('li')
  entry.appendChild(document.createTextNode(capitalizedWord))
  list.appendChild(entry)
}

function updateScore() {
  document.getElementById('score-number').innerHTML = state.score


  const scoreRatio = state.score / state.gameData.total
  let rank = ''
  if(scoreRatio > 0.7) rank = 'Queen Bee'
  else if(scoreRatio > 0.50) rank = 'Outstanding'
  else if(scoreRatio > 0.40) rank = 'Marvellous'
  else if(scoreRatio > 0.25) rank = 'Superb'
  else if(scoreRatio > 0.15) rank = 'Excellent'
  else if(scoreRatio > 0.08) rank = 'Skilled'
  else if(scoreRatio > 0.05) rank = 'Fine'
  else if(scoreRatio > 0.02) rank = 'Novice'
  else rank = 'Newbie'
  document.getElementById('rank').innerHTML = rank
}

function typeLetter(letter) {
  letter = letter.toLowerCase()
  state.currentInput += letter
  updateInputBox()
}

function showError(message) {
  const msgBox = document.getElementById('message-box')
  msgBox.innerHTML = message
  msgBox.classList.add('error')
  setTimeout(() => {
    const msgBox = document.getElementById('message-box')
    msgBox.classList.remove('error')
  }, 1000);
}

function showMessage(message) {
  const msgBox = document.getElementById('message-box')
  msgBox.innerHTML = message
  msgBox.classList.add('message')
  setTimeout(() => {
    const errBox = document.getElementById('message-box')
    errBox.classList.remove('message')
  }, 1000);
}

function checkWord() {
  if(state.currentInput.length < 4){
    console.log('too short');
    showError('Word too short')
  }
  else if(state.foundWords.includes(state.currentInput)){
    console.log('already found');
    showError('Word already found')
  }
  else if(hasInvalidLetter(state.currentInput)){
    console.log('invalid letter');
    showError('Invalid letter')
  }
  else if(!state.currentInput.includes(state.gameData.center)){
    console.log('no center');
    showError('Missing center letter')
  }
  else if(!state.gameData.wordlist.includes(state.currentInput)){
    console.log('not on list');
    showError('Not on word list')
  }
  else{
    state.score += scoreWord(state.currentInput)
    state.foundWords.push(state.currentInput)
    appendWordList(state.currentInput)
  }
  state.currentInput = ''
  updateScore()
  updateInputBox()
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
    showMessage('Panagram!')
    score += 7
  }

  return score
}

function deleteLetter() {
  state.currentInput = state.currentInput.slice(0, -1)
  updateInputBox()
}