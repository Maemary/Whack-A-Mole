
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const message = document.querySelector('.message');
  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
  }
  
  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
      console.log('Nahh')
      return randomHole(holes)
    }

    lastHole = hole;
    return hole
  }

  function peep(){
    const time = randomTime(500,1000)
    const hole = randomHole(holes);
    hole.classList.add('up')
    setTimeout(() => {
      hole.classList.remove('up');
      if(!timeUp) peep();

    }, time)
  }

  function startGame(){
    scoreBoard.textContent = 0;
    message.textContent = "";
    timeUp = false;
    score = 0;
    peep()

    setTimeout(() =>{
      timeUp = true
      message.textContent = `Game Over! Your score is ${score}. Click Start to play again.`;

      confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
    }, 10000)
  }

  function bonk(e){
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score
  }

  moles.forEach(mole => mole.addEventListener('click', bonk))
