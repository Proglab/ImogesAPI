const db = require('../models');
const Partners = db.partners;
const bcrypt = require('bcryptjs');


// FETCH all partners
exports.findAll = (req, res) => {
    Partners.findAll().then(partners => {
        // Send all customers to Client
        res.send(partners);
    });
};