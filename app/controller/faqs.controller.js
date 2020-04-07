const db = require('../models');
const Faqs = db.faqs;
const Librarycategories = db.librarycategories;

exports.getAll = (req, res)=>{
    if(req.query){
        if(req.query.terms){
            console.log(req.query.terms);
            let scope = {method: ['search', req.query.terms]};
            Faqs.scope(scope).findAll({include: Librarycategories}).then(faqs =>{
                res.status(200).send({faqs: faqs});
            }).catch(err => {
                res.status(500).json({
                    "description": "Can not access",
                    "error": err
                });
            });
        }
    }else{
        Faqs.findAll().then(faqs =>{
            res.status(200).send({faqs: faqs});
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access",
                "error": err
            });
        });
    }
};