/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice, dice2, prevDice, prevDice2, x, gamePlaying;

function initialise() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  prevDice = 0;
  prevDice2 = 0;
  x = 100;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.getElementById('winningScore').value = '';

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');

}
initialise();

document.getElementById('winningScore').addEventListener('keyup', runEvent)
function runEvent() {
  x = document.getElementById('winningScore').value;
  if (x === '' || x === 'null' || x === 'undefined') {
    x = 100;
  }
}


document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //Get random number
    dice = Math.floor(Math.random() * 6 + 1);
    dice2 = Math.floor(Math.random() * 6 + 1);
    console.log(activePlayer, dice, dice2)
    //Display the number
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    let diceDOM2 = document.querySelector('.dice-2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    //Add to round score except if it is 1
    if (dice !== 1 && dice2 !== 1) {
      roundScore = roundScore + dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

      if (dice === 6 && prevDice === 6) {
        if(dice2 === 6 && prevDice2 ===6) {
          console.log("Double 6 for player", activePlayer)
          scores[activePlayer] = 0;
          roundScore = 0;
          document.querySelector('#score-' + activePlayer).textContent = '0';
          document.querySelector('#current-' + activePlayer).textContent = '0';
          nextPlayer();
          // return 
        }
      }
      prevDice = dice;
      prevDice2 = dice2;
    }
    else {
      nextPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;
    //display in UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check if player won
    if (scores[activePlayer] >= x) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      gamePlaying = false;
    }
    else {
      //go to next player
      nextPlayer();
    }
  }
})

function nextPlayer() {
  prevDice = 0;
  prevDice2 = 0;
  dice2 = 0;
  dice = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initialise);