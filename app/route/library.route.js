
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

module.exports = function(app) {

    const medias = require('../controller/libraries.controller.js');


    // Create a new Customer
    app.post('/api/medias', upload.single('media'), medias.create);

    // Retrieve a single Customer by Id
    app.get('/api/medias', medias.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/medias/:mediaId', medias.findById);

    // Delete a Customer with Id
    app.delete('/api/medias/:mediaId', medias.delete);

};