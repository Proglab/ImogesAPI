const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
module.exports = function(app) {

    const newsletter = require('../controller/newsletter.controller.js');


    // Create a new Customer
    app.post('/api/newsletter', [allowCrossOrigin], newsletter.create);

    // Delete a Customer with Id
    app.delete('/api/newsletter/:customerId', newsletter.delete);
};