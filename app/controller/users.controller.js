const db = require('../models');
const Users = db.users;
const bcrypt = require('bcryptjs');

// Post a Customer
exports.create = (req, res) => {
    // Save to MySQL database
    Users.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(customer => {
        // Send created customer to client
        res.send(customer);
    });
};

// FETCH all Customers
exports.findAll = (req, res) => {
    Users.findAll().then(customers => {
        // Send all customers to Client
        res.send(customers);
    });
};

// Find a Customer by Id
exports.findById = (req, res) => {
    Users.findByPk(req.params.customerId).then(customer => {
        res.send(customer);
    })
};

// Update a Customer
exports.update = (req, res) => {
    const id = req.params.customerId;
    Users.update( { firstname: req.body.firstname, lastname: req.body.lastname },
        { where: {id: req.params.customerId} }
    ).then(() => {
        res.status(200).send("updated successfully a customer with id = " + id);
    });
};

// Delete a Customer by Id
exports.delete = (req, res) => {
    const id = req.params.customerId;
    Users.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a customer with id = ' + id);
    });
};

// validation du compte via mail
exports.validate = (req, res) => {
    Users.update( { validated: 1},
        { where: {id: req.userId} }
    ).then((data) => {
        res.status(200).send({auth: true, message: "updated successfully a customer with id = " + req.userId});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message: "Houston we've got a problem :)"});
    });
};