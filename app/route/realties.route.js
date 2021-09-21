const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const controller = require("../controller/projects.controller.js");

module.exports = function(app) {
    const controller = require('../controller/realties.controller.js');

    app.get('/api/realties', [allowCrossOrigin], controller.getAll);
    app.get('/api/projects/:id/realties', [allowCrossOrigin], controller.getRealtiesByProject);
    app.get('/api/realties/:id', [allowCrossOrigin], controller.getOne);
    app.put('/api/realties/:realtyId', [allowCrossOrigin, authJwt.verifyToken], controller.update);
    app.post('/api/realties/:projectId', [allowCrossOrigin, authJwt.verifyToken], controller.create);

};