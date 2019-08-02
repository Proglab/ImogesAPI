'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports = function(app) {
  fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'route.js');
      })
      .forEach(file => {
        require("./"+file)(app);
      });


};
