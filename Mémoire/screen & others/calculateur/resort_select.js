const resortSelect = document.querySelector('#npy-select-station');

resortSelect.addEventListener('change', (e) => {
	resort = e.target.value;
	launchProcess();
});