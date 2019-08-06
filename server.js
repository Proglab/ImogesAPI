const app = require('./app/app');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const db = require('./app/models');

require('./app/route/index.js')(app);

const server = app.listen(port, function() {

    const host = server.address().address;
    const port = server.address().port;

    db.sequelize.sync();

    console.log(host);
    console.log(port);

    console.log("App listening at http://%s:%s", host, port);
});
