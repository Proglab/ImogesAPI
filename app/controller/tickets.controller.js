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
const smsOnMessage = false;
const smsOnStatusChange = true;

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
                            sendToPartner(ticket.partnerId, ticket.id, ticket.createdAt, ticket.realtyId);
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
                            sendToPartner(ticket.partnerId, ticket.id, ticket.createdAt, ticket.realtyId);
                            res.status(200).send({ticket: ticket, message: message, libraries: libraries});
                        }).catch(function(error){
                            res.status(500).json(error);
                        });
                    });
                }
            }else{
                sendToPartner(ticket.partnerId, ticket.id, ticket.createdAt, ticket.realtyId);
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
                        senMessagedMail(req.userId, req.body.ticketId, req.body.realtyId);
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
                        senMessagedMail(req.userId, req.body.ticketId, req.body.realtyId);
                        res.status(200).send({message: message, libraries: libraries});
                    }).catch(function(error){
                        res.status(500).json(error);
                    });
                }).catch(function(error){
                    res.status(500).json(error);
                });
            }
        }else {
            senMessagedMail(req.userId, req.body.ticketId, req.body.realtyId);
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
                    planned: req.body.date,
                    status: 1
                },{ where: {id: id}
                }).then(ticket =>{
                    sendStatusMail('plan', id, req.body.realtyId);
                    res.status(200).send({id: id});
                });
                break;
            case 'done':
                Tickets.update({
                    status: 2
                },{ where: {id: id}
                }).then(ticket =>{
                    sendStatusMail('done', id, req.body.realtyId);
                    res.status(200).send({id: id});
                });
                break;
        }
    }else{
        res.status(500).json({message: 'Needs an action to perform'})
    }

};

exports.getAll = (req, res)=>{
    let role = req.query.role;
    let domain = req.query.domain;
    let where = {};
    if(domain === 'partner'){
        if(role === 'PARTNER' && req.isPartner){
            where = {partnerId:req.query.partnerId};
        }else if(role === 'ADMIN' && req.isAdmin){
            where = {};
        }else{
            where = {userId: req.userId};
        }
    }else{
        where = {userId: req.userId};
    }
    console.log(req.isPartner);
    Tickets.findAll({
        where: where,
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

function senMessagedMail(userId, ticketId, realtyId){
    Tickets.findByPk(ticketId).then((ticket) =>{
        let recipientType = userId === ticket.userId ? 'partner' : 'client';
        let userData;
        switch(recipientType){
            case 'client':
                Users.findByPk(ticket.userId).then((user) =>{
                    userData = user;
                    sendToMailjet('message', userData, ticket, recipientType, realtyId, smsOnMessage);
                });
                break;
            case 'partner':
                Partners.findOne({where:{id: ticket.partnerId}, include: Users}).then((partner) =>{
                    userData = partner.user;
                    sendToMailjet('message', userData, ticket, recipientType, realtyId, smsOnMessage);
                });
                break;
        }
    });
}

function sendStatusMail(type, ticketId, realtyId){
    Tickets.findByPk(ticketId, {include: Users}).then((ticket) =>{
        switch(type){
            case 'plan':
                sendToMailjet('status_plan', ticket.user, ticket, 'client', realtyId, smsOnStatusChange);
                break;
            case 'done':
                sendToMailjet('status_done', ticket.user, ticket, 'client', realtyId, false);
                break;
        }
    })
}

function sendToPartner(partnerId, ticketId, ticketDate, realtyId){
    Partners.findByPk(partnerId, {include: Users}).then(partner => {
        const ticketRef = moment(ticketDate).format('YYYY') + '-' + moment(ticketDate).format('MM') + '-' + realtyId + '-' + ticketId ;
        const firstname = partner.user.firstname;
        const targetUrl = "https://partners.imoges.be?ticketId=" + ticketId;
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
                if(partner.user.mobile) sendSMS(partner.user.mobile, "Bonjour " + firstname + ", vous avez une demande de SAV sur Imoges: " + targetUrl);
            })
            .catch((err) => {
                console.log(err.statusCode);
                if(partner.user.mobile) sendSMS(partner.user.mobile, "Bonjour " + firstname + ", vous avez une demande de SAV sur Imoges: " + targetUrl);
            });

    }).catch(err => {
        console.log(err);
    });
}

function sendToMailjet(type, user, ticket, recipientType, realtyId, sms){
    const ticketRef = moment(ticket.createdAt).format('YYYY') + '-' + moment(ticket.createdAt).format('MM') + '-' + realtyId + '-' + ticket.id ;
    let sendName;
    let targetUrl;
    let message;
    let buttonLabel;
    let smsText;

    switch(recipientType){
        case 'client':
            sendName = user.firstname + " " + user.lastname;
            targetUrl = 'https://imoges.be/account/ticket?id=' + ticket.id;
            break;
        case 'partner':
            sendName = user.company_name ? user.company_name : user.firstname + " " + user.lastname;
            targetUrl = 'https://partners.imoges.be/account/ticket?id=' + ticket.id;
            break;
    }

    switch (type){
        case 'message':
            message = "Vous avez reçu un nouveau message concernant la demande d'intervention <b>" + ticketRef + "</b>";
            buttonLabel = "Voir le message";
            smsText = "Bonjour " + user.firstname + ", vous avez un nouveau message sur le SAV Imoges: " + targetUrl;
            break;
        case 'status_plan':
            message = "Une date d'intervention a été planifiée pour votre demande <b>" + ticketRef + "</b>";
            buttonLabel = "Voir le ticket";
            smsText = "Bonjour " + user.firstname + ", Une date d'intervention a été planifiée pour votre demande Imoges: " + targetUrl;
            break;
        case 'status_done':
            message = "Notre technicien a marqué la demande <b>" + ticketRef + "</b> comme prestée.<br>";
            message += "Si votre problème est résolu, merci de cloturer votre demande sur notre site web";
            buttonLabel = "Voir le ticket";
            smsText = "Bonjour " + user.firstname + ", Imoges - Intervention terminée: " + targetUrl;
            break;
    }

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
                            "Email": user.email,
                            "Name": sendName
                        }
                    ],
                    "TemplateID": 1259452,
                    "TemplateLanguage": true,
                    "Subject": "SAV Imoges: Ticket " + ticketRef,
                    "Variables": {
                        "firstname": user.firstname,
                        "validationLink": targetUrl,
                        "buttonLabel": buttonLabel,
                        "message": message
                    }
                }
            ]
        });
    request
        .then((result) => {
            console.log(result.body);
            if(sms){
                if(user.mobile) sendSMS(user.mobile, smsText);
            }
        })
        .catch((err) => {
            console.log(err.statusCode);
            if(sms){
                if(user.mobile) sendSMS(user.mobile, smsText);
            }
        });
}

function sendSMS(mobile, message){
    // Envoi SMS (seulement en production)
    if (process.env.NODE_ENV === "production") {
        mobile = "32" + mobile.substr(1); // E.164 format
        //const smsText = "Bonjour " + firstname + ", vous avez un ticket SAV sur Imoges: " + targetUrl;
        const c = new TMClient(process.env.TEXT_MAGIC_USER, process.env.TEXT_MAGIC_KEY);
        c.Messages.send({text: message, phones: mobile}, function (err, res) {
            console.log('Messages.send()', err, res);
        });
    }
}