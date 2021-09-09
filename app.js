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

        .get('/errinsc', (req, res) => {
            res.sendFile(__dirname + '/public/pages/errinsc.html');
        })

        .get('/errco', (req, res) => {
            res.sendFile(__dirname + '/public/pages/errco.html');
        })

        .get('/deco', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        })

        

        .post('/insc', (req, res)=>{
            const findMailUser = 'SELECT user_mail FROM user WHERE user_mail = \'' + req.body.mail + '\'';
            const addUser = 'INSERT INTO user (user_firstname, user_lastname, user_birth, user_mail, user_phone, user_password) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.birth + '","' + req.body.mail + '","' + req.body.phone + '","' + req.body.password  + '")';
            const findUsers = 'SELECT * FROM user';
            const findMailAdmin = 'SELECT admin_mail FROM admin WHERE admin_mail = \'' + req.body.mail + '\'';
            const addAdmin = 'INSERT INTO admin (admin_firstname, admin_lastname, admin_birth, admin_mail, admin_phone, admin_password) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.birth + '","' + req.body.mail + '","' + req.body.phone + '","' + req.body.password  + '")';
            const findAdmins = 'SELECT * FROM admin';
            
            con.query(findMailUser, function (error, results, fields){
                
                if (results.length == 0 && req.body.adminCase !== 'on'){
                    console.log(req.body.adminCase);
                    con.query(addUser, function (error, results, fields){
                        res.redirect('/compte');
                        con.query(findUsers, function (error, results, fields){
                            console.log(results);
                        });
                    });                    
                }else if (results.length !== 0){
                    res.redirect('/errinsc');
                }

            })
            con.query(findMailAdmin, function (error, results, fields){
                if (results.length == 0 && req.body.adminCase == "on" && req.body.adminPassword == adminPassword){
                    con.query(addAdmin, function (error, results, fields){
                        res.redirect('/compte');
                        con.query(findAdmins, function (error, results, fields){
                            console.log(results);
                        });
                    }); 
                }else if (results.length !== 0){
                    res.redirect("/errinsc");
                }
            })

            
        })
        .post('/connect', (req, res) => {
            const findUserCo = 'SELECT user_mail, user_password, user_firstname FROM user WHERE user_mail = \'' + req.body.mail + '\'';

            con.query(findUserCo, function (error, results, fields){
                if (results[0].user_mail == req.body.mail && results[0].user_password == req.body.password && req.body.adminCase !== "on"){
                    userConected.push(results[0].user_firstname);
                    console.log(userConected);
                    res.redirect('/');
                }else if (error){
                    console.log("erreur")
                
                }else{
                    res.redirect('/errco');
                }
            })

        })
        
       


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