const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../models');
const Role = db.role;
const User = db.users;

verifyToken = (req, res, next) => {


    console.log('verifyToken');

    let token = req.headers['x-access-token'];

    if (!token){
        return res.status(403).send({
            auth: false, message: 'No token provided.'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }

        console.log(decoded);

        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {

    User.findOne({
        where: {id: req.userId},
        attributes: ['firstname', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]})
        .then(user => {
            user.getRoles().then(roles => {
                for(let i=0; i<roles.length; i++){
                    console.log(roles[i].name);
                    if(roles[i].name.toUpperCase() === "ADMIN"){
                        next();
                        return;
                    }
                }

                res.status(403).send("Require Admin Role!");
                return;
            })
        })
};

isPmOrAdmin = (req, res, next) => {
    console.log('isPmOrAdmin');
    console.log(req);
    console.log(req.userId);
    User.findOne({
        where: {id: req.userId},
        attributes: ['id', 'firstname', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]})
        .then(user => {

            console.log(user);

            user.getRoles().then(roles => {
                for(let i=0; i<roles.length; i++){
                    if(roles[i].name.toUpperCase() === "USER"){
                        next();
                        return;
                    }

                    if(roles[i].name.toUpperCase() === "ADMIN"){
                        next();
                        return;
                    }
                }

                res.status(403).send("Require PM or Admin Roles!");
            })
        })
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;