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
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        
        console.log('middle3');
        cb(null, true);
    }
}