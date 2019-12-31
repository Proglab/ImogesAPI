const db = require('../models');
const Tickets = db.tickets;
const Ticketmessages = db.ticketmessages;
const Librarycategories = db.librarycategories;
const Users = db.users;
const Libraries = db.libraries;
const Partners = db.partners;
const Realties = db.realties;
const moment = require('moment');
const TMClient = require('textmagic-rest-client');
const mailjet = require ('node-mailjet')
    .connect(process.env.MAILJET_KEY,process.env.MAILJET_SECRET);

exports.create = (req, res) => {
    //console.log(req.body);
    Tickets.create({
        priority: req.body.priority,
        partnerId: req.body.partnerId,
        realtyId: req.body.realtyId,
        title: req.body.title,
        userId: req.userId
    }).then(ticket => {
        Ticketmessages.create({
            message: req.body.message,
            ticketId: ticket.id,
            userId: req.userId
        }).then(message =>{
            if(req.body.pictures){
                if(Array.isArray(req.body.pictures)) {
                    // images multiples
                    console.log('multiple');
                    Librarycategories.create({
                        library_category_label: 'Tickets',
                        library_category_table_name: 'Ticketmessages',
                        library_category_table_id: message.id
                    }).then(Librarycategories => {
                        let allPictures = [];
                        for (let i in req.body.pictures) {
                            const picture = {
                                library_media_name: req.body.pictures[i].name,
                                library_media_resource: 'client',
                                library_media_extension: 'jpg',
                                library_media_type: 'image/jpeg',
                                librarycategoryId: Librarycategories.id,
                                userId: req.userId
                            };
                            allPictures.push(picture);
                        }
                        Libraries.bulkCreate(allPictures, {returning: true}).then(allPictures =>{
                            sendToPartner(ticket.partnerId, ticket.id, ticket.createdAt, ticket.partnerId);
                            res.status(200).send({ticket: ticket, message: message, allPictures: allPictures});
                        }).catch(function(error){
                            res.status(500).json(error);
                        });
                    });
                }else{
                    // image unique
                    Librarycategories.create({
                        library_category_label: 'Tickets',
                        library_category_table_name: 'Ticketmessages',
                        library_category_table_id: message.id
                    }).then(Librarycategories =>{
                        Libraries.create({
                            library_media_name: req.body.pictures.name,
                            library_media_resource: 'client',
                            library_media_extension: 'jpg',
                            library_media_type: 'image/jpeg',
                            librarycategoryId: Librarycategories.id,
                            userId: req.userId
                        }).then(libraries =>{
                            sendToPartner(ticket.partnerId, ticket.id, ticket.createdAt, ticket.partnerId);
                            res.status(200).send({ticket: ticket, message: message, libraries: libraries});
                        }).catch(function(error){
                            res.status(500).json(error);
                        });
                    });
                }
            }else{
                sendToPartner(ticket.partnerId, ticket.id, ticket.createdAt, ticket.partnerId);
                res.status(200).send({ticket: ticket, message: message});
            }
        });
    });
};

exports.getOne = (req, res) => {
    Tickets.scope(['withAll']).findByPk(req.query.id, {
        include: [{model: Users}, {model:Partners, required: true, include:Users}, {model: Ticketmessages, order:[['id', 'DESC']], include:[
            {model:Librarycategories, require: false},
            {model:Users, required: true},
        ]}]
    }).then(ticket => {
        res.status(200).json({
            "description": "getOne - " + req.query.id,
            "ticket": ticket
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};

exports.createMessage = (req, res) =>{
    Ticketmessages.create({
        message: req.body.message,
        ticketId: req.body.ticketId,
        userId: req.userId
    }).then(message =>{
        if(req.body.pictures){
            if(Array.isArray(req.body.pictures)) {
                // images multiples
                console.log('multiple');
                Librarycategories.create({
                    library_category_label: 'Tickets',
                    library_category_table_name: 'Ticketmessages',
                    library_category_table_id: message.id
                }).then(Librarycategories => {
                    let allPictures = [];
                    for (let i in req.body.pictures) {
                        const picture = {
                            library_media_name: req.body.pictures[i].name,
                            library_media_resource: 'client',
                            library_media_extension: 'jpg',
                            library_media_type: 'image/jpeg',
                            librarycategoryId: Librarycategories.id,
                            userId: req.userId
                        };
                        allPictures.push(picture);
                    }
                    Libraries.bulkCreate(allPictures, {returning: true}).then(allPictures =>{
                        res.send({message: message, allPictures: allPictures});
                    }).catch(function(error){
                        res.status(500).json(error);
                    });
                }).catch(function(error){
                    res.status(500).json(error);
                });
            }else{
                // image unique
                Librarycategories.create({
                    library_category_label: 'Tickets',
                    library_category_table_name: 'Ticketmessages',
                    library_category_table_id: message.id
                }).then(Librarycategories =>{
                    Libraries.create({
                        library_media_name: req.body.pictures.name,
                        library_media_resource: 'client',
                        library_media_extension: 'jpg',
                        library_media_type: 'image/jpeg',
                        librarycategoryId: Librarycategories.id,
                        userId: req.userId
                    }).then(libraries =>{
                        res.status(200).send({message: message, libraries: libraries});
                    }).catch(function(error){
                        res.status(500).json(error);
                    });
                }).catch(function(error){
                    res.status(500).json(error);
                });
            }
        }else {
            res.status(200).send({message: message});
        }
    }).catch(err=>{
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};

exports.updateTicket = (req, res)=>{
    const id = req.params.ticketId;
    if(req.body.action){
        switch(req.body.action){
            case 'close':
                Tickets.update({
                    status: 3
                },{ where: {id: id}
                }).then(ticket =>{
                    res.status(200).send({id: id});
                });
                break;
            case 'plan':
                Tickets.update({

                });
        }
    }else{
        res.status(500).json({message: 'Needs an action to perform'})
    }

};

exports.getAll = (req, res)=>{
    Tickets.findAll({
        where:{userId: req.userId},// Changer pour admin et partenaire
        include:[{model: Realties}]
    }).then(tickets =>{
        res.status(200).send(tickets);
    }).catch(err =>{
        res.status(500).json({
            "description": "Can not access",
            "error": err
        });
    });
};

function sendToPartner(partnerId, ticketId, ticketDate, realtyId){
    Partners.findByPk(partnerId, {include: Users}).then(partner => {
        const ticketRef = moment(ticketDate).format('YYYY') + '-' + moment(ticketDate).format('MM') + '-' + realtyId + '-' + ticketId ;
        const firstname = partner.user.firstname;
        const targetUrl = "https://imoges.be?ticketId=" + ticketId;
        const sendName = partner.user.company_name ? partner.user.company_name : partner.user.firstname + " " + partner.user.lastname;

        // Envoi du mail
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": "info@absolute-fx.com",
                            "Name": "Imoges sprl"
                        },
                        "To": [
                            {
                                "Email": partner.user.email,
                                "Name": sendName
                            }
                        ],
                        "TemplateID": 1158381,
                        "TemplateLanguage": true,
                        "Subject": "SAV Imoges: Ticket " + ticketRef,
                        "Variables": {
                            "firstname": firstname,
                            "validationLink": targetUrl
                        }
                    }
                ]
            });
        request
            .then((result) => {
                console.log(result.body);
                sendSMS(partner.user.mobile, firstname, targetUrl);
            })
            .catch((err) => {
                console.log(err.statusCode);
                sendSMS(partner.user.mobile, firstname, targetUrl);
            });

    }).catch(err => {
        console.log(err);
    });
}


function sendSMS(mobile, firstname, targetUrl){
    // Envoi SMS (seulement en production)
    if (process.env.NODE_ENV === "production") {
        mobile = "32" + mobile.substr(1); // E.164 format
        const smsText = "Bonjour " + firstname + ", vous avez un ticket SAV sur Imoges: " + targetUrl;
        const c = new TMClient(process.env.TEXT_MAGIC_USER, process.env.TEXT_MAGIC_KEY);
        c.Messages.send({text: smsText, phones: mobile}, function (err, res) {
            console.log('Messages.send()', err, res);
        });
    }
}