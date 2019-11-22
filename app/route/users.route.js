const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const authJwt = require('./../middleware/verifyJwtToken');

module.exports = function(app) {

    const users = require('../controller/users.controller.js');


    // Create a new Customer
    app.post('/api/users', users.create);

    // Retrieve all Customer
    app.get('/api/users', users.findAll);

    // validate user from mail
    app.put('/api/users/validate', [allowCrossOrigin, authJwt.verifyToken], users.validate);

    // Retrieve a single Customer by Id
    app.get('/api/users/:customerId', users.findById);

    // Update a Customer with Id
    app.put('/api/users/:customerId', users.update);

    // Delete a Customer with Id
    app.delete('/api/users/:customerId', users.delete);
};