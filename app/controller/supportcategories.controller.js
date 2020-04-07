const db = require('../models');
const config = require('../config/config.js');
const Supportcategories = db.supportcategories;
const Faqs = db.faqs;
const Partners = db.partners;
const Librarycategories = db.librarycategories;

exports.getAll = (req, res) => {
    Supportcategories.findAll({order:[['title', 'ASC']], include:[Faqs, Partners]}).then(categories => {
        res.status(200).send({categories: categories});
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.getOne = (req, res)=>{
    Supportcategories.findByPk(req.params.catId, {include: [{
        model: Faqs,
        order:[['title', 'ASC']],
        include: {model: Librarycategories, require: false}
    }]}).then(category =>{
        res.status(200).send({category: category});
    }).catch(err => {
        res.status(500).send(err);
    });
};