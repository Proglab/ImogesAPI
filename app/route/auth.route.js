const verifySignUp = require('./../middleware/verifySignUp');
const authJwt = require('./../middleware/verifyJwtToken');
const allowCrossOrigin = require('./../middleware/allowCrossOrigin');

module.exports = function(app) {

    const controller = require('../controller/auth.controller.js');

    app.post('/api/auth/signup', [allowCrossOrigin, verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

    app.post('/api/auth/signin', [allowCrossOrigin], controller.signin);

    app.post('/api/auth/verify', [allowCrossOrigin], controller.verifyToken);

    app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};