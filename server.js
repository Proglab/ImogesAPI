const app = require('./app');
const port = process.env.PORT || 4000;
const db = require('./db');

require('./app/route/users.route.js')(app);
require('./app/route/auth.route.js')(app);

const server = app.listen(port, function() {

    const host = server.address().address;
    const port = server.address().port;

    console.log(host);
    console.log(port);

    console.log("App listening at http://%s:%s", host, port);
});
