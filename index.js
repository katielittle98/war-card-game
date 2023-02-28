let deckId;
const remainingCards = document.getElementById("remaining");
const newCards = document.getElementById("new-cards");
let myScore = 0;
let compScore = 0;
const compScoreEl = document.getElementById("comp-score");
const myScoreEl = document.getElementById("my-score");

function getCard(){
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            remainingCards.textContent = "Remaining Cards: " + data.remaining 
            deckId = data.deck_id
            console.log(data)
        })
}

document.getElementById('deck-btn').addEventListener("click", getCard)

let cardImages = document.getElementById("card-images");

newCards.addEventListener("click", function() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`,
    {
        method: "GET",
        headers: {"Content-Type": "applications/json"}
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const winnerText = winningCard(data.cards[0], data.cards[1])
            console.log(winnerText)

            const winner = document.getElementById("winner")
            winner.textContent = winnerText

            remainingCards.textContent = "Remaining Cards: " + data.remaining 

            if (data.remaining == 0) {
                newCards.disabled = true
                if ( compScore > myScore) {
                    winner.textContent = "COMPUTER WINS THE GAME."
                } 
                else if (compScore < myScore) {
                    winner.textContent = "CONGRATS. YOU WIN THE GAME!"
                }
                else if (compScore == myScore) {
                    winner.textContent = "IT'S A TIE GAME."
                }
            }
            
            cardImages.innerHTML = ''
            for (let card of data.cards) {
                cardImages.innerHTML += `
                <div class="card-images" id="card-images">
                    <img src="${card.image}" alt="" id="card">
                </div>`
            }

        })
})

function winningCard(card1, card2) {
    cardsArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", 
    "JACK", "QUEEN", "KING", "ACE"]

    const card1Index = cardsArray.indexOf(card1.value)
    const card2Index = cardsArray.indexOf(card2.value)

    if (card1Index > card2Index) {
        compScore++
        compScoreEl.textContent =  `Computer Score: ${compScore}`
        return 'Computer wins!'
        
    }
    else if (card1Index < card2Index) {
        myScore ++
        myScoreEl.textContent = `My Score: ${myScore}`
        return 'You win!'
    }
    else {
       return 'War!'
    }


}

