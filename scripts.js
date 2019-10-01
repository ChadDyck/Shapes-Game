$(document).ready(function() {
	//check for returning player
	if (localStorage.getItem('visited') != true) {
		//set score and round number to default
		localStorage.setItem('score', 0);
		localStorage.setItem('round', 1);
		//run setup for new players
		firstTime();
	}
})

let firstTime = () => {
	//display tutorial text
	$('#tutorialContainer').css('display','inline-flex');
}

let gameOver = () => {
	//set score and round number to default
	localStorage.setItem('score', 0);
	localStorage.setItem('round', 1);
	//hide UI elements
	$('#timerContainer', '#scoreContainer', '#roundContainer').css('display', 'none');
	$('#tutorialContainer').css('display','inline-flex');
}


let timer = () => {
	//set variables for the round and time remaining in the current round
	let curRound = localStorage.getItem('round');
	let timeLeft = 35 + (curRound * 5);
	let roundTimer = setInterval(() => {
		//function to start next round
		start();
		//if life reaches 0, end the timer
		if (curLife == 0) {
			timeLeft = 0;
		}
		//set div element text as round and score variables
		$('#roundNumber').html(curRound);
		$('#scoreCount').html(localStorage.getItem('score'));
		//subtract 1 second from timer
		timeLeft--;
		//set div element text as time remaining
		document.getElementById("countdownTimer").textContent = timeLeft;
		//run when round timer reaches 0
		if (timeLeft < 1) {
			clearInterval(roundTimer);
			//remove remaining spawned elements
			$('div[id^="red"], div[id^="green"], div[id^="yellow"], div[id^="blue"]').remove();
			//show play button
			$('.fa-play').css('display', 'block');
			//hide UI elements
			$('#lifeCounter, #timerContainer, #scoreContainer, #roundContainer').css('display', 'none');
			//reset variable showing if round is started
			started = 0;
			//if current life is above 0, increment round number by 1
			if (curLife > 0) {
				curRound++;
			}
			//set values for round and score, and set that the player has played before now that they have completed a round
			localStorage.setItem('visited', true);
			localStorage.setItem('round', curRound);
			localStorage.setItem('score', score);
		}
	}, 1000);
}

//change color of centre circle as life value lowers
let lifeColor = (percentage, hue0, hue1) => {
		hue0 = 0;
		hue1 = 110;
		percentage = (curLife / maxLife);
    	let hue = (percentage * (hue1 - hue0)) + hue0;

    	return 'hsl(' + hue + ', 80%, 40%)';
}

let makeid = () => {
	//set variables of empty text string, and a a string of possible characters available
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	//create 7 character long string to later append to div names
	for (var i = 0; i < 7; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
}

//sets direction generated elements will spawn
let position = () => {
		var randPosition = Math.floor((Math.random() * 4) + 1);

		return randPosition;
	};

//begin shape generation and start the next round
let start = () => {
	//show timer
	$('#timerContainer').css('display', "block");
	//start function to generate id names
	makeid();
	//start function to pick direction shapes come from
	position();
	//create empty div element
	let div = document.createElement('div');
	//positions shapes based on direction spawned
	if (position() == 1) {
		$(div).css('top', "-150px");
		$(div).css('left', Math.floor((Math.random() * screen.width) + 1));
	}
	else if (position() == 2) {
		$(div).css('right', "-150px");
		$(div).css('top', Math.floor((Math.random() * screen.height) + 1));
	}
	else if (position() == 3) {
		$(div).css('bottom', "-150px");
		$(div).css('left', Math.floor((Math.random() * screen.width) + 1));
	}
	else if (position() == 4) {
		$(div).css('left', "-150px");
		$(div).css('top', Math.floor((Math.random() * screen.height) + 1));
	}
	else {
		return;
	}
	//picks a random value between 1 and 100
	let randValue = Math.floor((Math.random() * 100) + 1);
	//assigns IDs matched to specific colors based on weighted rolls from randValue
	if (randValue <= 60) {
		document.getElementById('hideOverflow').appendChild(div);
		$(div).addClass('redrectangle');
		div.id = "red"+makeid();
	}
	else if (randValue <= 80 && randValue >=61) {
		document.getElementById('hideOverflow').appendChild(div);
		$(div).addClass('greendiamond');
		div.id = "green"+makeid();
	}
	else if (randValue <= 92 && randValue >=81) {
		document.getElementById('hideOverflow').appendChild(div);
		$(div).addClass('yellowcircle');
		div.id = "yellow"+makeid();
	}
	else if (randValue <= 100 && randValue >=93) {
		document.getElementById('hideOverflow').appendChild(div);
		$(div).addClass('blueparallelogram');
		div.id = "blue"+makeid();
	}
	//sets animation towards center
	$(div).animate({
		'top': ((window.innerHeight / 2) - ($(div).outerHeight() / 2)) + 'px', 'left': ((window.innerWidth / 2) - ($(div).outerWidth() / 2)) + 'px',
	}, 15000 - (curRound * 1000));
	//subtracts life when entering shape enters center
	$(div).promise().done(function(){
		$(div).remove();
		curLife--;
		if (curLife < 1) {
			curLife = 0;
			gameOver();
		}
		lifeColor();
		$('#start-button').css('background-color', lifeColor());
		$('#lifeCounter').html(curLife);
	});
}

let started;
let maxLife = 20;
let curLife;
//when start button is clicked, begin the game
$('#start-button').on('click touch', function() {
	//if the game hasn't been started, set the current life to maximum, and then start
	if (started != 1) {
		curLife = maxLife;
		started = 1;
		//starts shape generation for the current round
		start();
		//starts timer for the current round
		timer();
		//hide tutorial text, and the start button
		$('#tutorialContainer', '.fa-play').css('display','none');
		//sets start button background color
		$('#start-button').css('background-color', 'hsl(104.5, 80%, 40%)')
		//show the life, score, and round numbers
		$('#lifeCounter', '#scoreContainer', '#roundContainer').css('display', "block");
		$('#lifeCounter').html(curLife);
	}	
});