const db = require('../config/db.config.js');
const config = require('../config/configApp.js');

const Realties = db.realties;
const Librarycategories = db.librarycategories;
const Libraries = db.libraries;

exports.getAll = (req, res) => {
    console.log('getAll');
    let request;
    if(req.query){
        if(req.query.status !== undefined || req.query.active !== undefined){
            request = {where: {}};
            if(req.query.status) request.where.realty_status = req.query.status;
            if(req.query.active) request.where.realty_active_online = req.query.active;
        }
        if(req.query.limit) request.limit = Number(req.query.limit);
    }
    Realties.findAll(request).then(realties => {
        res.status(200).json({
            "description": "Realties list",
            "realties": realties
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};

exports.getRealtiesByProject = (req, res) => {
    console.log('getRealtiesByProject');
    console.log('id: ' + req.params.id);
    Realties.findAll({
        where: {ProjectId: req.params.id}
    }).then(realties => {
        res.status(200).json({
            "description": "Realties list",
            "realties": realties
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};