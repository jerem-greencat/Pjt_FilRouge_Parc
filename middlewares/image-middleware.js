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
        return storage;
    },
    allowedImage: function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Seuls les fichiers images sont autorisés';
            return cb(new Error('Seuls les fichiers images sont autorisés'), false);
        }
        cb(null, true);
    }
}