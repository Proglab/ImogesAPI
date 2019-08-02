const authJwt = require('./../middleware/verifyJwtToken');

module.exports = function(app) {
    const controller = require('../controller/realties.controller.js');

    app.get('/api/realties', controller.getAll);
    app.get('/api/projects/:id/realties', controller.getRealtiesByProject);
    app.get('/api/realties/:id', controller.getOne);

};