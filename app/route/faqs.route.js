const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const checkRoles = require('./../middleware/checkRoles');

module.exports = function(app) {
    const controller = require('../controller/faqs.controller.js');
    app.get('/api/faqs', [allowCrossOrigin, authJwt.verifyToken], controller.getAll);
};