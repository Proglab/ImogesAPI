const config = require('../config/config.js');

allowCrossOrigin = (req, res, next) => {
    console.log('allowCrossOrigin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
};

module.exports = allowCrossOrigin;