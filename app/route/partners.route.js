const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const authJwt = require('./../middleware/verifyJwtToken');

module.exports = function(app) {

    const partners = require('../controller/partners.controller.js');

    // Retrieve all Customer
    app.get('/api/partners', [allowCrossOrigin], partners.findAll);
    app.get('/api/partner/:partnerId', [allowCrossOrigin], partners.findOne);

};