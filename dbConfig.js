const mysql = require('mysql');


const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "movieLand"
    })

function performQuery(request, values = []) {
    
    return new Promise((resolve, reject) => {
      con.query(request, values, (err, rows, fields) => {
        if (err) {
            con.end();
          return reject(err);
        }
        con.end();
        console.log("Closing connection");
        return resolve({ rows, fields });
      });
    });
  }



exports.performQuery = performQuery;
exports.con = con;