
const db = require('../models');
const config = require('../config/configApp.js');
const Projects = db.projects;
const LibraryCategories = db.librarycategories
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAll = (req, res) => {
    console.log('getAll');
    let projects = Projects;
    if(req.query){
        if(req.query.active) projects = projects.scope('active');
        if(req.query.limit) projects = projects.scope({method: ['limit', Number(req.query.limit, 0)]});
        if(req.query.order){
            switch (req.query.order){
                case "id":
                    projects = projects.scope({method: ['order', 'id', 'DESC']});
                break;
                case "buildDate":
                    projects = projects.scope({method: ['order', 'project_start_build_date', 'DESC']});
                break;
            }
        }
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