const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');

module.exports = function(app) {
    const controller = require('../controller/tickets.controller.js');
    app.post('/api/tickets', [allowCrossOrigin, authJwt.verifyToken], controller.create);
    app.get('/api/ticket', [allowCrossOrigin, authJwt.verifyToken], controller.getOne);
};