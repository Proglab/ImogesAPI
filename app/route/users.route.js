module.exports = function(app) {

    const customers = require('../controller/users.controller.js');


    // Create a new Customer
    app.post('/api/users', customers.create);

    // Retrieve all Customer
    app.get('/api/users', customers.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/users/:customerId', customers.findById);

    // Update a Customer with Id
    app.put('/api/users/:customerId', customers.update);

    // Delete a Customer with Id
    app.delete('/api/users/:customerId', customers.delete);
};