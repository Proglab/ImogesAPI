const db = require('../models');
const Partners = db.partners;
const Users = db.users;
const bcrypt = require('bcryptjs');


// FETCH all partners
exports.findAll = (req, res) => {
    Partners.findAll().then(partners => {
        // Send all customers to Client
        res.send(partners);
    });
};

exports.findOne = (req, res) => {
    /*Partners.findOne({where:{userId: req.params.partnerId}}, {include:Users}).then(partner => {
        // Send all customers to Client
        console.log('--> PARTNER', partner);
        res.send(partner);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });*/

    Partners.findByPk(req.params.partnerId, {include:Users}).then(partner => {
        // Send all customers to Client
        console.log('--> PARTNER', partner);
        res.send(partner);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};