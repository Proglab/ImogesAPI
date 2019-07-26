
const db = require('../models');
const Projects = db.projects;

exports.getAll = (req, res) => {
    console.log('getAll');
    let scope = [];
    if(req.query){
        if(req.query.active) scope.push('active');
        if(req.query.limit) scope.push({method: ['limit', 0, Number(req.query.limit)]});
        if(req.query.order_field) {
            let order = !req.query.order_direction ? 'DESC' : req.query.order_direction;
            scope.push({method: ['order', req.query.order_field, order]});
        }
        if(req.query.diffused) scope.push('diffused');
        if(req.query.media) scope.push('withMedia');
    }
    // request.where.project_start_diffusion_date = {[Op.lt]: new Date()};
    Projects.scope(scope).findAll().then(projects => {
        res.status(200).json({
            "description": "projects list",
            "projects": projects
        });
    }).catch(err => {
        if (err.name === 'SequelizeDatabaseError')
        {
            res.status(500).json({
                "description": err.parent.sqlMessage,
                "error": err
            });
        }
        else
        {
            res.status(500).json({
                "description": "Can not access",
                "error": err
            });
        }
    });
};

exports.getOne = (req, res) => {
    console.log('getOne');

    let projects = Projects;
    if(req.query){
        if(req.query.active) projects.scope('active');
    }
    projects.findByPk(req.param('id')).then(projects => {
        res.status(200).json({
            "description": "get a project",
            "projects": projects
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};