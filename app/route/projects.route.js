const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');

module.exports = function(app) {
    const controller = require('../controller/projects.controller.js');

    app.get('/api/projects', [allowCrossOrigin], controller.getAll);
    app.get('/api/projects/:id', [allowCrossOrigin], controller.getOne);

};