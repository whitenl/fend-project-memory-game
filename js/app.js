/*
 * Create a list that holds all of your cards
 */

const allCards = 	['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bicycle', 
					'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 
					'fa-cube', 'fa-cube', 'fa-diamond', 'fa-diamond', 
					'fa-leaf', 'fa-leaf', 'fa-paper-plane-o', 'fa-paper-plane-o'];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//dynamically generate cards
function generateCard(card) {
	console.log('generating card');
	return `<li class="card"><i class="fa ${card}"></i></li>` ;
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




function initGame() {

	startTimer();
	let deck = document.querySelector('.deck');
	var cardHTML = shuffle(allCards).map(function(card) {
		return generateCard(card);
	});

	deck.innerHTML = cardHTML.join('');
}

initGame();



//event listener to show card once it is clicked   --- thanks Mike! https://www.youtube.com/watch?v=_rUH-sEs68Y
const cards = document.querySelectorAll('.card');
let showCards = [];
let openCount = 0;


// need to do something to prevent clicking when showCards.length of 2 and only count clicks for cards that are not matched)


cards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		showCards.push(card);
		card.classList.add('open','show');
		
		if (showCards.length === 2) {
			setTimeout(function () {
				showCards.forEach(function(card) {
					card.classList.remove('open','show');
					console.log(showCards.length);
				});
			showCards = [];
			

			}, 1000);

			
		}
	});
});


// Timer that resets with restart button
// ** TO DO ** 
// Starts when first click occurs

let timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
function startTimer() {
    let timeElapsed = window.setInterval(function () {
          timer.innerHTML = minutes+" mins "+ seconds + " secs";
            seconds++;
            if(seconds==60){
            	minutes++;
            	seconds=0;
            }
        }, 1000);
}
  
var resetTimer = function () {
	timer.innerHTML = "0 mins 0 secs";
  	clearInterval(timeElapsed);
}


