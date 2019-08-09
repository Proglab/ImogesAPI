const db = require('../models');
const Libraries = db.libraries;


exports.create = (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
};

// FETCH all Customers
exports.findAll = (req, res) => {
    res.send('tous les medias');
};

// Find a Customer by Id
exports.findById = (req, res) => {
    const id = req.params.mediaId;
    res.send('find media by id :' + id.toString());
};

// Delete a Customer by Id
exports.delete = (req, res) => {
    const id = req.params.mediaId;
    res.send('delete media by id :' + id.toString());
};
