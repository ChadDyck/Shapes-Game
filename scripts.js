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
	$('#timerContainer').css('display', 'none');
	$('#scoreContainer').css('display', 'none');
	$('#roundContainer').css('display', 'none');
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
	var hue0 = 0;
		let hue1 = 110;
		let percentage = (curLife / maxLife);
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