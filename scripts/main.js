// window.addEventListener('DOMContentLoaded', function() {
//   // Execute after page load
// })

const suit = ['hearts', 'diamonds', 'clubs', 'spades']
const rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
let deck = []
const dealerHand = document.getElementById('dealer-hand')
const playerHand = document.getElementById('player-hand')
const dealButton = document.getElementById('deal-button')
const hitButton = document.getElementById('hit-button')
const playerPoints = document.getElementById('player-points')
const dealerPoints = document.getElementById('dealer-points')
const messages = document.getElementById('messages')
const standButton = document.getElementById('stand-button')
let dealer = []
let player = []
let dealersPoints = 0
let playersPoints = 0


const shuffle = (deck) => {
  let suffledCards = deck.sort((a, b) => 0.5 - Math.random());
  return suffledCards;
}

const buildDeck = () => {
  for (let i of suit) {
    for (let x of rank) {
      let card = {rank: x, suit: i}
      deck.push(card)
    }
  }
  shuffle(deck)
}
buildDeck()
console.log(deck)

const hit = (playerCard = true) => {
  let card = deck.pop()
  if (playerCard) {
    player.push(card)
    getCardImage(card, true)
    calcHand(card, true)
  } else { 
    dealer.push(card)
    getCardImage(card, false)
    calcHand(card, false)
   }
}


const deal = () => {
  for (let i = 0; i < 4; i++){
    // let card = deck.pop()
    if (i % 2 == 1) {
      hit(false)
      // dealer.push(card)
      // getCardImage(card, false)
      console.log(`dealer ${dealer[0].rank}`)
    } else {
      hit()
      // player.push(card)
      // getCardImage(card, true)
      console.log(`player ${player[0].rank}`)
    }   
  }
}

//images
const getCardImage = (dealtCard, player) => {
  let card = document.createElement('img')
  if (dealtCard.rank < 11) {
    card.setAttribute( "src", `./images/${dealtCard.rank}_of_${dealtCard.suit}.png`)
  } else if (dealtCard.rank == 11) {
    card.setAttribute("src", `./images/jack_of_${dealtCard.suit}.png`)
  } else if (dealtCard.rank == 12) {
    card.setAttribute("src", `./images/queen_of_${dealtCard.suit}.png`)
  } else if (dealtCard.rank == 13) {
    card.setAttribute("src", `./images/king_of_${dealtCard.suit}.png`)
  } else if (dealtCard.rank == 14) {
    card.setAttribute("src", `./images/ace_of_${dealtCard.suit}.png`)
  }
  if (player) {
    playerHand.appendChild(card)
  }else {
    dealerHand.appendChild(card)
  }   
}

const calcHand = (card, player) => {
  points = 0
  if (card.rank < 11) {
    points += card.rank
  } else if (card.rank == 14) {
    points += 11
  } else {
    points += 10
  }
  if (player) {
    playersPoints += points
    playerPoints.innerHTML = playersPoints
    if (playersPoints > 20) {
      pointConditions()
      dealerTurn()
    }
  } else {
    dealersPoints += points
    dealerPoints.innerHTML = dealersPoints
    if (dealersPoints > 20) {
      pointConditions()
      dealerTurn()
    }
  }
  
}

const pointConditions = () => {
  if (playersPoints > 21) {
    messages.innerHTML = 'You busted fool'
  } else if (dealersPoints > 21) {
    messages.innerHTML = 'You busted too fool'
  } else if (playersPoints == 21) {
    messages.innerHTML = 'Blackjack!'
  } else if (dealersPoints == 21) {
    messages.innerHTML = 'Dealer, has Blackjack!'
  } else if (playersPoints > dealersPoints) {
    messages.innerHTML = 'Player wins!'
  } else if (dealersPoints > playersPoints) {
    messages.innerHTML = 'Dealer wins!'
  } else {
    messages.innerHTML = 'Tie'
  }
  setTimeout(() => {
    restartGame();
  }, 3000);
}

const dealerTurn = () => {
  if (dealersPoints < 17) {
    hit(false)
    dealerTurn()
  }
  pointConditions()
}

const restartGame = () => {
  playerHand.innerHTML = ''
  dealerHand.innerHTML = ''
  dealersPoints = 0
  playersPoints = 0
  messages.innerHTML = ""
  playerPoints.innerHTML = ''
  dealerPoints.innerHTML = ''
  }


const allowDealBtn = () => {
  dealButton.disabled = true
}



dealButton.addEventListener("click", deal)
hitButton.addEventListener("click", hit)
standButton.addEventListener("click", dealerTurn)
    
    
