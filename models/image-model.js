const db = require('../dbConfig');

module.exports = {
    storeImage: function (inputValues, callback) {
        // check unique email address
        const sql = 'SELECT * FROM image WHERE image_name =?';

        try {
            db.con.query(sql, inputValues.image_name, function (err, data, fields) {
                let msg = "";
                if (err) throw err;
                if (data.length > 1) {
                    msg = inputValues.image_name + " is already exist";
                } else {
                    // save users data into database
                    const sql = 'INSERT INTO image SET ?';
                    db.con.query(sql, inputValues, function (err, data) {
                        if (err) throw err;
                    });
                    msg = inputValues.image_name + "is uploaded successfully";
                }
                return callback(msg)
            })
        } catch (error){
            console.log(error);
            return callback(error)
        }
    }
}