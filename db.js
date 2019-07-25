const db = require('./app/config/db.config.js');

const Role = db.role;
/*
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
    initial();

});
*/


function initial(){
    Role.create({
        id: 1,
        name: "USER"
    });

    Role.create({
        id: 2,
        name: "CLIENT"
    });

    Role.create({
        id: 3,
        name: "PARTNER"
    });

    Role.create({
        id: 4,
        name: "ADMIN"
    });

    Role.create({
        id: 5,
        name: "GOD"
    });
}

