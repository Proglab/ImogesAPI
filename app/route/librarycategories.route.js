
module.exports = function(app) {

    const librarycategories = require('../controller/librarycategories.controller.js');

    app.get('/api/projects/:projectId/librarycategories', librarycategories.findByProject);
    app.get('/api/projects/:projectId/librarycategories/:librarycategories', librarycategories.findOneByProject);

};