const db = require('../models');
const Role = db.roles;
const User = db.users;
const Partner = db.partners;

checkRoles = (req, res, next) => {
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
        user.roles.forEach((role)=>{
            req.isAdmin = role.name === 'ADMIN';
            req.isPartner = role.name === 'PARTNER';
        });
        if(req.isPartner){
            Partner.findOne({where:{userId:req.userId}}).then((partner)=>{
                req.partnerId = partner.id;
                next();
            })
        }else{
            next();
        }
    });
};

module.exports = checkRoles;