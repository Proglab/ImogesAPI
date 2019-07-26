
const db = require('../models');
const config = require('../config/configApp.js');
const Projects = db.projects;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAll = (req, res) => {
    console.log('getAll');
    let request = {};
    if(req.query){
        request = {where: {}};
        if(req.query.active) request.where.project_active_online = req.query.active;
        if(req.query.limit) request.limit = Number(req.query.limit);
        if(req.query.order){
            switch (req.query.order){
                case "id":
                    request.order = [['id', 'DESC']];
                break;
                case "buildDate":
                    request.order = [['project_start_build_date', 'DESC']];
                break;
            }
        }
    }
    request.where.project_start_diffusion_date = {[Op.lt]: new Date()};
    Projects.findAll(request).then(projects => {
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
    let request = {};
    if(req.query){
        request = {where: {}};
        if(req.query.active) request.where.project_active_online = req.query.active;
        if(req.query.limit) request.limit = Number(req.query.limit);
    }
    request.where.project_start_diffusion_date = {[Op.lt]: new Date()};
    request.order = [['id', 'DESC']];
    Projects.findAll(request).then(projects => {
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