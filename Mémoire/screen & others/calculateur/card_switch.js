let hasCard = true;
const hasCardSwitch = document.getElementById('card-switch');
 
hasCardSwitch.addEventListener('click', function () {
	if (hasCard === true) {
	  hasCard = false;
	} else {
	  hasCard = true;
	}
	launchProcess();
});