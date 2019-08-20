const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');

module.exports = function(app) {
    const controller = require('../controller/realties.controller.js');

    app.get('/api/realties', [allowCrossOrigin], controller.getAll);
    app.get('/api/projects/:id/realties', [allowCrossOrigin], controller.getRealtiesByProject);
    app.get('/api/realties/:id', [allowCrossOrigin], controller.getOne);

};