const multer = require('multer');


module.exports.image = {
    storage: function () {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploadFiles/')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
        
        console.log('middle 1');
        return storage;
    },
    allowedImage: function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            
        console.log('middle2');
            req.fileValidationError = 'Seuls les fichiers images sont autorisés';
            return cb(new Error('Seuls les fichiers images sont autorisés'), false);
        }
        
        cb(null, true);
    }
}