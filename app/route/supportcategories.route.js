const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
const checkRoles = require('./../middleware/checkRoles');

module.exports = function(app) {
    const controller = require('../controller/supportcategories.controller.js');
    app.get('/api/supportcategories', [allowCrossOrigin, authJwt.verifyToken, checkRoles], controller.getAll);
    app.get('/api/supportcategories/:catId', [allowCrossOrigin, authJwt.verifyToken, checkRoles], controller.getOne);
};