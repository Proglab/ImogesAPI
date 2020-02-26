const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const checkRoles = require('./../middleware/checkRoles');

module.exports = function(app) {
    const controller = require('../controller/tickets.controller.js');
    app.post('/api/tickets', [allowCrossOrigin, authJwt.verifyToken], controller.create);
    app.get('/api/ticket', [allowCrossOrigin, authJwt.verifyToken], controller.getOne);
    app.get('/api/tickets', [allowCrossOrigin, authJwt.verifyToken, checkRoles], controller.getAll);
    app.post('/api/ticketmessages', [allowCrossOrigin, authJwt.verifyToken], controller.createMessage);
    app.put('/api/ticket/:ticketId', [allowCrossOrigin, authJwt.verifyToken], controller.updateTicket);
};