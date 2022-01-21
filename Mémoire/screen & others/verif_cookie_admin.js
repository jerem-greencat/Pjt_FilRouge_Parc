let adminSection = document.querySelector('#parc-admin-section');
const admintkn = getCookie("admintkn");
const adminContainer = document.querySelector('#admin-container');

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);

		}
		console.log(c);
		if (c.indexOf(name) == 0) {
			adminSection.classList.add('active');
			return c.substring(name.length, c.length);
		} else {
			adminSection.classList.remove('active');
		}
	}

	return "";
}