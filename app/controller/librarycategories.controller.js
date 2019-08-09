const db = require('../models');
const LibraryCategories = db.librarycategories;

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}



exports.findByProject = (req, res) => {
    const id = req.params.projectId;
    let scope = [];
    scope.push({method: ['projects', id]});

    if(!isEmptyObject(req.query)){
        if(req.query.order_field) {
            let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
            scope.push({method: ['order', req.query.order_field, order]});
        }

        if (req.query.library_media_extension)
        {
            console.log('library_media_extension' + req.query.library_media_extension);
            scope.push({method: ['withMediaByExtension', req.query.library_media_extension]});
        }

        if (req.query.library_media_param)
        {
            console.log('library_media_param' + req.query.library_media_param);
            scope.push({method: ['withMediaByParam', req.query.library_media_param]});
        }

        if (req.query.user_id)
        {
            console.log('user_id' + req.query.user_id);
            scope.push({method: ['withMediaByUser', req.query.user_id]});
        }
    }
    else
    {
        scope.push('withMedia');
    }

    console.log(req.query);

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