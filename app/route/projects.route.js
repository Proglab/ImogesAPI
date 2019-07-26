const authJwt = require('./../middleware/verifyJwtToken');

module.exports = function(app) {
    const controller = require('../controller/projects.controller.js');

    app.get('/api/projects', controller.getAll);

};