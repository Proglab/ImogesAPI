const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const authJwt = require('./../middleware/verifyJwtToken');
const users = require("../controller/users.controller.js");

module.exports = function(app) {

    const users = require('../controller/users.controller.js');


    // Create a new Customer
    app.post('/api/users', users.create);

    // Retrieve all Customer
    app.get('/api/users', users.findAll);

    // Retrieve customer by role
    app.get('/api/user', users.findByRole);

    // validate user from mail
    app.put('/api/users/validate', [allowCrossOrigin, authJwt.verifyToken], users.validate);

    // Retrieve a single Customer by Id
    app.get('/api/users/:customerId', [allowCrossOrigin, authJwt.verifyToken], users.findById);

    // Update a Customer with Id
    app.put('/api/users/:customerId', [allowCrossOrigin, authJwt.verifyToken],users.update);

    // delete realty from user
    app.delete('/api/users/realty', [allowCrossOrigin, authJwt.verifyToken],users.deleteRealty);
    app.post('/api/users/realty', [allowCrossOrigin, authJwt.verifyToken],users.addRealty);

    // Delete a Customer with Id
    app.delete('/api/users/:customerId', users.delete);
};