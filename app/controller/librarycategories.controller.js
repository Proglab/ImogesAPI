const db = require('../models');
const LibraryCategories = db.librarycategories;


exports.findByProject = (req, res) => {
    const id = req.params.projectId;
    let scope = [];
    scope.push({method: ['projects', id]});

    if(req.query){
        if(req.query.order_field) {
            let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
            scope.push({method: ['order', req.query.order_field, order]});
        }
    }


    LibraryCategories.scope(scope).findAll().then(librarycategories => {
        res.status(200).json({
            "description": "library categories list",
            "librarycategories": librarycategories
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};