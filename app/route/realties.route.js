const authJwt = require('./../middleware/verifyJwtToken');

module.exports = function(app) {
    const controller = require('../controller/realties.controller.js');

    app.get('/api/realties/getall', controller.getAll);
    app.get('/api/realties/getRealtiesByProject/:id', controller.getRealtiesByProject);

};