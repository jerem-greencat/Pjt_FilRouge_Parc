const fs = require('fs');

app.get('/vie', (req, res) => {
	
	let arrayFiles = [];
	let uploadFiles = './public/uploadFiles/';

	fs.readdir(uploadFiles, (err, files) => {
		console.log(files)
		if (err) {
			throw err;
		}
		files.forEach(file => {
			console.log(file);
			uploadFiles = 'http://localhost:8080/uploadFiles/';
			arrayFiles.push(uploadFiles + file );
			console.log(arrayFiles);
		});
		
		res.render(__dirname + '/public/pages/vie.ejs', { alertMsg: "", arrayFiles });
	});


})
