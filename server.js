const app = require('./app/app');
const port = process.env.PORT || 4000;
const db = require('./app/models');

require('./app/route/users.route.js')(app);
require('./app/route/auth.route.js')(app);
require('./app/route/realties.route.js')(app);
require('./app/route/projects.route.js')(app);
require('./app/route/swagger.js')(app);

const server = app.listen(port, function() {

    const host = server.address().address;
    const port = server.address().port;

    db.sequelize.sync();

    console.log(host);
    console.log(port);

    console.log("App listening at http://%s:%s", host, port);
});
