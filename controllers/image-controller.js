const multer = require('multer');
const imageMiddleware = require('../middlewares/image-middleware');
const imageModel = require('../models/image-model');



module.exports = {
    imageUploadForm: function (req, res) {
        
        console.log('image-control 1');
    },
    storeImage: function (req, res) {
        
        console.log('image-control 2');
        const upload = multer({
            
            storage: imageMiddleware.image.storage(),
            allowedImage: imageMiddleware.image.allowedImage
        }).single('image');
        
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
                
                console.log('image-control 4');
            } else if (err) {
                res.send(err);
                
                console.log('image-control 5');
            } else {
                // store image in database
                const imageName = req.file.originalname;
                const inputValues = {
                    image_name: imageName
                    
                }
                // call model
                imageModel.storeImage(inputValues, function (data) {
                    res.redirect('/vie'); 
                })

            }

        })

    }
}