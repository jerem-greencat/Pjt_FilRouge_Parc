const con = require('../app');


module.exports = {
    storeImage: function (inputValues, callback) {
        // check unique email address
        const sql = 'SELECT * FROM image WHERE image_name =?';
        con.query(sql, inputValues.image_name, function (err, data, fields) {
            if (err) throw err
            if (data.length > 1) {
                console.log('image-mod 1');
                const msg = inputValues.image_name + " is already exist";
            } else {
                
                console.log('image-mod 2');
                // save users data into database
                const sql = 'INSERT INTO image SET ?';
                con.query(sql, inputValues, function (err, data) {
                    if (err) throw err;
                });
                const msg = inputValues.image_name + "is uploaded successfully";
            }
            return callback(msg)
            
        })
    }
}