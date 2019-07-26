
const db = require('../models');
const Projects = db.projects;

exports.getAll = (req, res) => {
    console.log('getAll');
    let projects = Projects;
    if(req.query){
        if(req.query.active) projects = projects.scope('active');
        if(req.query.limit) projects = projects.scope({method: ['limit', Number(0, req.query.limit)]});
        if(req.query.order_field) {
            if(!req.query.order_direction) req.query.order_direction = 'DESC';
            projects = projects.scope({method: ['order', req.query.order_field, req.query.order_direction]});
        }
        if(req.query.diffused) projects = projects.scope('diffused');
    }
    // request.where.project_start_diffusion_date = {[Op.lt]: new Date()};
    projects.findAll().then(projects => {
        res.status(200).json({
            "description": "projects list",
            "projects": projects
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
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