const multer = require('multer');
function checkMultipart(req, res, next) {
    const contentType = req.headers["content-type"];
    // Make sure it's multipart/form
    if (!contentType || !contentType.includes("multipart/form-data")) {
        // Stop middleware chain and send a status
        return res.sendStatus(500);
    }
    next();
}

function rewriter(req, res, next) {
    // Set the request fields that you want
    req.body.avatarUri = req.file.destination + req.file.filename;
    next();
}





module.exports = function(app) {

    const medias = require('../controller/medias.controller.js');
    const uploader = require('../controller/upload.controller.js');


    // Create a new Customer
    app.post('/api/medias', checkMultipart, uploader.upload.single('media'), rewriter);

    // Retrieve a single Customer by Id
    app.get('/api/medias', medias.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/medias/:mediaId', medias.findById);

    // Delete a Customer with Id
    app.delete('/api/medias/:mediaId', medias.delete);
};