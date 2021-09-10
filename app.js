const path = require("path");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mysql = require('mysql');
const { query } = require("express");
let bodyParser = require("body-parser");

let userConected = [];
let adminPassword = "I'm an admin";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movieLand"
});





con.connect(function (err) {
    if (err) throw err;
    app.use(bodyParser.urlencoded({ extended: false }))
        .use(express.static(path.join(__dirname, '/public')))
        .get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        })

        .get('/attractions', (req,res) => {
            res.sendFile(__dirname + '/public/pages/attractions.html');
        })

        .get('/seloger', (req, res)=> {
            res.sendFile(__dirname + '/public/pages/seloger.html');
        })

        .get('/contact', (req, res) => {
            res.sendFile(__dirname + '/public/pages/contact.html');
        })

        .get('/emploi', (req, res) => {
            res.sendFile(__dirname + '/public/pages/emploi.html');
        })

        .get('/engagements', (req, res) => {
            res.sendFile(__dirname + '/public/pages/engagement.html');
        })

        .get('/formules', (req, res) => {
            res.sendFile(__dirname + '/public/pages/formule.html');
        })

        .get('/noustrouver', (req, res) => {
            res.sendFile(__dirname + '/public/pages/noustrouver.html');
        })

        .get('/partenaires', (req, res) => {
            res.sendFile(__dirname + '/public/pages/partenaire.html');
        })

        .get('/vie', (req, res) => {
            res.sendFile(__dirname + '/public/pages/vie.html');
        })

        .get('/recompenses', (req, res) => {
            res.sendFile(__dirname + '/public/pages/recompense.html');
        })

        .get('/compte', (req, res) => {
            if (userConected.length == 0){
                res.sendFile(__dirname + '/public/pages/connection.html');
            }else{
                res.sendFile(__dirname + '/public/pages/moncompte.html');
            }
        })

        .get('/inscription', (req, res) => {
            res.sendFile(__dirname + '/public/pages/inscription.html');
        })

        .get('/error/:id', (req, res) => {
            let error, returnPath, returnMsg;
            switch(parseInt(req.params.id)) {
                case 1:
                    error = "Ce mail est déjà pris.";
                    returnPath = "/inscription";
                    returnMsg = "Retour au formulaire d'inscription";
                    break;
                case 2:
                    error = "Une erreur est survenue lors de l'inscription. Veuillez recommencer.";
                    returnPath = "/inscription";
                    returnMsg = "Retour au formulaire d'inscription";
                    break;
                case 3:
                    error = "Ce couple mail / mot de passe n'existe pas dans la base de données.";
                    returnPath = "/connection";
                    returnMsg = "Retour au formulaire de connexion";
                    break;
                default:
                    error = "Vous devez vous connecter pour accèder à cette page.";
                    returnPath = "/connection";
                    returnMsg = "Retour au formulaire de connexion";
            }
            res.render(__dirname + '/public/pages/error.ejs', { error, returnPath, returnMsg });
        })

        .get('/deco', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        })




        .post("/addUser", (req, res) => {
            const fName = req.body.firstname;
            const lName = req.body.lastname;
            const birth = req.body.birth;
            const mail = req.body.mail;
            const phone = req.body.phone;
            const pwd = req.body.password;
            const adminC = req.body.adminCase;
            const passAdmin = req.body.passAdmin;

            let query;
            let insert;
            if (adminC !== 'on') {
                query = `SELECT user_id FROM user WHERE user_mail = "${mail}" LIMIT 1;`;
            } else {
                query = `SELECT admin_id FROM admin WHERE admin_mail = "${mail}" LIMIT 1;`;
            }
            
            if (adminC == 'on' && passAdmin == adminPassword){                
                insert = `INSERT INTO admin (admin_firstname, admin_lastname, admin_birth, admin_mail, admin_phone, admin_password) VALUES ("${fName}", "${lName}", "${birth}", "${mail}", "${phone}","${pwd}");`;

            } else{                
                insert = `INSERT INTO user (user_firstname, user_lastname, user_birth, user_mail, user_phone, user_password) VALUES ("${fName}", "${lName}", "${birth}", "${mail}", "${phone}","${pwd}");`;

            }

            con.query(query, (errorSlct, users) => {
                if (errorSlct) throw errorSlct;
                if(users.length !== 0) {
                    console.log(users)
                    res.redirect('/error/1');
                } else {
                    con.query(insert, (error, result) => {
                        if (error) {
                            console.log("non c'est la");
                        }
                        if (result.affectedRows) {
                            res.redirect('/');
                        } else {
                            res.redirect('/error/2');
                        }
                    });
                } 
            });
        })


        .post("/connect", (req, res) => {
            const mail = req.body.mail;
            const pwd = req.body.password;
            const adminC = req.body.adminCase;
            const passAdmin =  req.body.passAdmin;

            let query;
            let update;
            
            if(adminC !== 'on'){
                query = `SELECT user_id FROM user WHERE user_mail = "${mail}" AND user_password = "${pwd}" AND connected = 0 LIMIT 1;`;
            }else if (adminC == 'on' && passAdmin == adminPassword){
                query = `SELECT admin_id FROM admin WHERE admin_mail = "${mail}" AND admin_password = "${pwd}" AND connected = 0 LIMIT 1;`;
            };
            

            


            con.query(query, (errorSlct, users) => {
                if (errorSlct) throw errorSlct;
                if (users.length === 0) {
                    res.redirect('/error/3');
                } else {
                    const userId = users[0].user_id;   
                    const adminId = users[0].admin_id; 
                    if(adminC !== 'on'){
                        update = `UPDATE user SET connected = 1 WHERE user_id = ${userId};`;
                    }else if (adminC == 'on' && passAdmin == adminPassword){
                        update = `UPDATE admin SET connected = 1 WHERE admin_id = ${adminId};`;
                    };                
                    con.query(update, (error, result) => {
                        if (error) throw error;
                        res.redirect('/');
                    });
                }
            });
        });






        // .post('/connect', (req, res) => {
        //     const findUserCo = 'SELECT user_mail, user_password, user_firstname FROM user WHERE user_mail = \'' + req.body.mail + '\'';

        //     con.query(findUserCo, function (error, results, fields){
        //         if (results[0].user_mail == req.body.mail && results[0].user_password == req.body.password && req.body.adminCase !== "on"){
        //             userConected.push(results[0].user_firstname);
        //             console.log(userConected);
        //             res.redirect('/');
        //         }else if (error){
        //             console.log("erreur")
                
        //         }else{
        //             res.redirect('/errco');
        //         }
        //     })

        // })
        
       


    io.on('connection', function (socket) {
        socket.on("connected", () => {
            socket.emit("userco", userConected);
        })

        socket.on("deco", () => {
            userConected = [];
            socket.emit("userDeco", userConected);
        } )

    

        
    });
    server.listen(8080);

});