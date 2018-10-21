
let clicks = 0;
let moves = 0;
let timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
let activeCards = [];
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let first = document.querySelector('.first-star');
let second = document.querySelector('.second-star');
let timeElapsed = 0;


/*
 * Create a list that holds all of your cards
 */

const allCards = 	['fa-chess', 'fa-chess', 'fa-chess-bishop', 'fa-chess-bishop', 
				'fa-chess-board', 'fa-chess-board', 'fa-chess-king', 'fa-chess-king', 
				'fa-chess-knight', 'fa-chess-knight', 'fa-chess-queen', 'fa-chess-queen', 
				'fa-chess-pawn', 'fa-chess-pawn', 'fa-chess-rook', 'fa-chess-rook'];

// function that resets game
function newGame() {

	//clear clicks & move counters
	clicks = 0;
	moves = 0;
	moveCounter.innerText = 0;

	// call functions to shuffle deck, set up card listener & clear time

	shuffleDeck();
	cardListener();
	resetTimer();

	// clear active cards
	activeCards = [];

	//make all stars visible
	first.style.visibility = 'visible';
  	second.style.visibility = 'visible';

	//event listener for restart icon
	document.querySelector('.restart').addEventListener('click', newGame);
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//programatically generate card HTML
function generateCard(card) {
	return `<li class="card grow"><i class="fa ${card}"></i></li>` ;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffles deck
function shuffleDeck(){
	let deck = document.querySelector('.deck');
	let cardHTML = shuffle(allCards).map(function(card) {
		return generateCard(card);
	});
	deck.innerHTML = cardHTML.join('');
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


//Removes first and second stars based on move count after 12 & 16 moves respectively

function starRating () {
	if (moves > 12 && moves < 16) {
    	first.style.visibility = 'hidden';
  	}
 	else if (moves > 16) {
   	 	second.style.visibility = 'hidden';
  	} 
}

//move counter   
function moveCount() {
  	moves++;
  	moveCounter.innerHTML = moves;
  	starRating();
}

// click counter, starts timer after first click

function clickCount() {
	
	if (clicks === 0) {
		startTimer();
		clicks++;
	} else {
	clicks++;
	}
}


function cardListener() {
//event listener to show card once it is clicked then check for matches   --- thanks Mike! https://www.youtube.com/watch?v=_rUH-sEs68Y

const cards = document.querySelectorAll('.card');
let matchedCards = document.getElementsByClassName("match");

cards.forEach(function(card) {

	card.addEventListener('click', function(e) {
	    //if card is not flipped, and < 2 cards open, flip card on click
	    if (!card.classList.contains('open','show','match') && activeCards.length < 2) 
	    { 
	    	clickCount();
	      	activeCards.push(card);
	      	card.classList.add('open', 'show');
	      
		if (activeCards.length === 2) {
			moveCount();

	        //if cards match remain flipped

	        if (activeCards[0].innerHTML === activeCards[1].innerHTML) {
	        	activeCards[0].classList.add('match','open','show');
	        	activeCards[1].classList.add('match','open','show');
	        	activeCards = [];

	          	//if all cards are matched stop timer and trigger modal
	        	if (matchedCards.length === 16) {
	          		timer = timer.innerText;
	          		modal();
	          	}
	          
	        } else {
	          //If no match cards flip back over 
	        	setTimeout(function() {
	            	activeCards.forEach(function(card) {
	              		card.classList.remove('open', 'show');
	            	});
	            
	            	activeCards = [];
	            
	         	}, 1000);
	        } 
	      }
	    }
	});
});
}

//Starts seconds & minutes timer 
function startTimer() {

		timeElapsed = window.setInterval(function () {
		timer.innerHTML = minutes+" mins "+ seconds + " secs";
	    seconds++;
	    if(seconds==60){
	    	minutes++;
	    	seconds=0;
	    }
	}, 1000);
}


function resetTimer() {
  	clearInterval(timeElapsed);
  	minutes = 0;
  	seconds = 0;
  	timer = document.querySelector('.timer');
  	timer.innerHTML = minutes+" mins "+ seconds + " secs";
}

//Win modal   How To Create a Modal Box https://www.w3schools.com/howto/howto_css_modals.asp
var modal = function() {
	let popup = document.querySelector('.hide');
	popup.classList.remove('hide');  

    //Final move, star rating, time 
    document.getElementById("final-moves").innerHTML = moves;
    document.getElementById("final-stars").innerHTML = stars.innerHTML;
    document.getElementById("final-time").innerHTML = timer;

	document.querySelector('.yes-please').addEventListener('click', function(){
	        popup.classList.add('hide'); 
	       	newGame();
	});  
	
	document.querySelector('.no-thanks').addEventListener('click', function(){
	        popup.classList.add('hide');
	});  
}


newGame();