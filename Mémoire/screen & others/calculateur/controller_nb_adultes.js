const adultPlus = document.getElementById('adult-plus');
const adultScore = document.getElementById('adult-score');
const adultMoins = document.getElementById('adult-moins');
  
let nbAdultes = 1; 
let nbChild = 0;
let nbStud = 0;


adultPlus.addEventListener('click', function () {
	if (nbAdultes + nbChild + nbStud > 9) {
	  alert('10 personnes max');
	} else {
	  nbAdultes++;
	  adultScore.innerHTML = nbAdultes;
	  launchProcess();
	}
});
