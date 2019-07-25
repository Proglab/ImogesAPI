const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    pool: {
        max: env.max,
        min: env.pool.min,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.projects = require('../models/projects.model.js')(sequelize, Sequelize);
db.realties = require('../models/realties.model.js')(sequelize, Sequelize);
db.phases = require('../models/phases.model.js')(sequelize, Sequelize);
db.libraries = require('../models/libraries.model.js')(sequelize, Sequelize);
db.librarycategories = require('../models/librarycategories.model.js')(sequelize, Sequelize);
db.realtytypes = require('../models/realtytypes.model.js')(sequelize, Sequelize);
db.Realtycontracttypes = require('../models/Realtycontracttypes.model.js')(sequelize, Sequelize);
db.Projecttypes = require('../models/Projecttypes.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.users, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.users.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

// projects
db.projects.belongsToMany(db.phases, {through: 'project_phases', foreignKey: 'project_id'});
db.projects.hasMany(db.realties);
db.projects.belongsTo(db.Projecttypes);
// realties
db.realties.belongsTo(db.projects);
db.realties.belongsTo(db.realtytypes);
db.realties.belongsTo(db.Realtycontracttypes);
// phases
db.phases.belongsToMany (db.projects, {through: 'project_phases', foreignKey: 'phase_id'});
// libraries
db.libraries.belongsTo(db.librarycategories);
db.libraries.belongsTo(db.users);
// libraries categories
db.librarycategories.hasMany(db.libraries);
// realty types
db.realtytypes.hasMany(db.realties);
// realty contract type
db.Realtycontracttypes.hasMany(db.realties);
// project type
db.Projecttypes.hasMany(db.projects);


module.exports = db;