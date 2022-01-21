const bestChoice = document.getElementById('npy-bestchoice');
const bestChoiceNs = document.getElementById('npy-bestchoice-ns');

function getBestChoice() {
	if (diffTotal > 0) {
	  bestChoice.classList.remove('active');
	  bestChoiceNs.classList.add('active');
	  bestChoiceNs.innerText = `Vous économisez ${diffTotal}€`;
	} else if (diffTotal == 0) {
	  bestChoice.classList.remove('active');
	  bestChoiceNs.classList.remove('active');
	} else {
	  bestChoiceNs.classList.remove('active');
	  bestChoice.classList.add('active');
	}
}