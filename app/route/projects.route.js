const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');

module.exports = function(app) {
    const controller = require('../controller/projects.controller.js');

    app.get('/api/projects', [allowCrossOrigin], controller.getAll);
    app.get('/api/projects/:id', [allowCrossOrigin], controller.getOne);
    app.post('/api/projects', [allowCrossOrigin, authJwt.verifyToken], controller.create);
    app.put('/api/projects/:id', [allowCrossOrigin, authJwt.verifyToken], controller.update);
};