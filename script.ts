window.onload = windowLoaded;

function windowLoaded() {
  getGame().then((data)=>{
    console.log(data)
  })
}

async function getGame(type = 'today') {
  if(type !== 'today' && type !== 'random') return
  const response = await fetch(`https://freebee.fun/play/${type}`, {method: 'GET'})
  return response.json();
}