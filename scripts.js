$(document).ready(function() {
	//check for returning player
	if (localStorage.getItem('visited') != 'true') {
		//set score and round number to default
		localStorage.setItem('score', 0);
		localStorage.setItem('round', 0);
		//run setup for new players
		firstTime();
	}
})

let firstTime = () => {
	//display tutorial text
	$('#tutorialContainer').css('display','inline-flex');
}