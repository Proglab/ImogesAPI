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

// FETCH all libraries
exports.findAll = (req, res) => {
    let sqlReq = {};
    if(req.query){
        if (req.query.type) {
            sqlReq.where = {library_media_type: req.query.type};
        }
        let orderBy = [];
        if(req.query.orderField){
            orderBy.push([]);
            orderBy[0].push(req.query.orderField);
            if(req.query.orderDirection){
                orderBy[0].push(req.query.orderDirection);
            }
            sqlReq.order = orderBy;
            console.log(sqlReq);
        }
    }
    Libraries.findAll(sqlReq).then(media =>{
        res.send(media);
    });
};

// Find a library by Id
exports.findById = (req, res) => {
    const id = req.params.mediaId;
    res.send('find media by id :' + id.toString());
};

// Delete a library by Id
exports.delete = (req, res) => {
    const id = req.params.mediaId;
    res.send('delete media by id :' + id.toString());
};