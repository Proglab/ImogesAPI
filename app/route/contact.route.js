const allowCrossOrigin = require('./../middleware/allowCrossOrigin');
module.exports = function(app) {

    const contact = require('../controller/contact.controller.js');

    // Send message
    app.post('/api/contact', [allowCrossOrigin], contact.sendMessage);

};