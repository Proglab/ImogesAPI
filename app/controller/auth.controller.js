
const db = require('../models');
const config = require('../config/config.js');
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailjet = require ('node-mailjet')
    .connect(process.env.MAILJET_KEY,process.env.MAILJET_SECRET);

exports.verifyToken = (req, res) =>{
    jwt.verify(req.query.token, config.secret, function(error, decoded){
        if(decoded){
            res.status(200).send({ valid: true });
        }else{
            res.status(403).send({ valid: false });
        }
    });
};

exports.signup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp");

    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        const newUser = user;
        Role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                const token = jwt.sign({ id: newUser.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                const mailType= 'account_validation';
                const request = mailjet
                    .post("send", {'version': 'v3.1'})
                    .request({
                        "Messages": setMail(mailType, token, newUser.id, newUser.email, newUser.firstname, newUser.lastname, 1094699, "Activation de votre compte")
                    });
                request
                    .then((result) => {
                        console.log(result.body);

                        res.status(200).send({message: "Votre compte a été créé avec succès, vérifiez votre messagerie."});
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send({message: "Votre compte a été créé avec succès mais il y a eu un problème lors de l'envoi du mail"});
                    })
            });
        }).catch(err => {
            res.status(500).send(err);
        });
    }).catch(err => {
        res.status(500).send(err);
    })
};

exports.signin = (req, res) => {
    console.log("Sign-In");

    User.findOne({
        where: {username: req.body.username},
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        if (!user) {
            return res.status(404).send({ auth: false, accessToken: null, reason: 'Utilisateur non trouvé!' });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Mauvais mot de passe!" });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, accessToken: token, user: user });

    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};

exports.userContent = (req, res) => {
    console.log('userContent');
    User.findOne({
        where: {id: req.userId},
        attributes: ['firstname', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "User Content Page",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
};

exports.adminBoard = (req, res) => {
    console.log('adminBoard');
    User.findOne({
        where: {id: req.userId},
        attributes: ['firstname', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Admin Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Admin Board",
            "error": err
        });
    })
};

exports.managementBoard = (req, res) => {
    console.log('managementBoard');
    User.findOne({
        where: {id: req.userId},
        attributes: ['firstname', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Management Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Management Board",
            "error": err
        });
    })
};

exports.validationMail = function(req, res){

    User.findOne({
        where: {id: req.body.userId}
    }).then(user => {
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        const mailType= 'account_validation';
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages": setMail(mailType, token, user.id, user.email, user.firstname, user.lastname, 1094699, "Activation de votre compte")
            });
        request
            .then((result) => {
                console.log(result.body);

                res.status(200).send({message: "Un email avec un lien de validation vous a été envoyé"});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({message: "Problème lors de l'envoi du mail de validation"});
            })
    }).catch((err) =>{
        res.status(500).send('Error -> ' + err);
    });
};

exports.resetPass = function(req, res){
    User.findOne({
        where: {email: req.body.email}
    }).then(user => {
        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 3600 // expires in 24 hours
        });
        const mailType= 'reset_pass';
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages": setMail(mailType, token, user.id, user.email, user.firstname, user.lastname, 1102536, "Nouveau mot de passe")
            });
        request
            .then((result) => {
                console.log(result.body);

                res.status(200).send({message: "Un email avec un lien de validation vous a été envoyé", status: true});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({message: "Problème lors de l'envoi du mail de validation", status: false});
            })
    }).catch((err) =>{
        res.status(500).send({message: "Aucun utilisateur trouvé", status: false});
    })
};

exports.newPass = function(req, res){
    User.update( { password: bcrypt.hashSync(req.body.password, 8)},
        { where: {id: req.userId} }
    ).then((data) => {
        res.status(200).send({status: true, message: "Mot de passe changé"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message: "Houston we've got a problem :)", status: false});
    });
};

function setMail(mailType, token, userId, email, firstname, lastname, templateId, title){
    const fullname = firstname + " " + lastname;
    let link;
    switch (mailType){
        case 'account_validation':
            link = config.websiteUrl + "auth/validate?token=" + token + "&userId=" + userId;
            break;
        case 'reset_pass':
            link = config.websiteUrl + 'auth/newpass?token=' + token;
            break;
    }
    return [
        {
            "From": {
                "Email": "info@absolute-fx.com",
                "Name": "Imoges sprl"
            },
            "To": [
                {
                    "Email": email,
                    "Name": fullname
                }
            ],
            "Subject": title,
            "TemplateId": templateId,
            "TemplateLanguage": true,
            "Variables":{
                "firstname": firstname,
                "validationLink": link
            }
        }
    ];
}