
const db = require('../models');
const config = require('../config/configApp.js');

const Realties = db.realties;
const Librarycategories = db.librarycategories;
const Libraries = db.libraries;

exports.getAll = (req, res) => {
    console.log('getAll');
    let scope = [];
    if(req.query){
        if(req.query.limit)
        {
            if(!req.query.offset) req.query.offset = 0;
            scope.push({method: ['limit', Number(req.query.offset), Number(req.query.limit)]});
        }
        if(req.query.order_field) {
            let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
            scope.push({method: ['order', req.query.order_field, order]});
        }

        if(req.query.media) scope.push('withMedia');

        if(req.query.status){
            scope.push({method: ['status', req.query.status]});
        }
        if(req.query.star){
            scope.push(['star']);
        }
        if (req.query.active) {
            scope.push(['active']);
        }
    }
    Realties.scope(scope).findAll().then(realties => {
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