const db = require('../models');
const Tickets = db.tickets;
const Ticketmessages = db.ticketmessages;
const Librarycategories = db.librarycategories;
const Users = db.users;
const Libraries = db.libraries;
const Partners = db.partners;
const Realties = db.realties;
const TMClient = require('textmagic-rest-client');

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
                            sendSmsToPartner(ticket.partnerId, ticket.id);
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
                            sendSmsToPartner(ticket.partnerId, ticket.id);
                            res.status(200).send({ticket: ticket, message: message, libraries: libraries});
                        }).catch(function(error){
                            res.status(500).json(error);
                        });
                    });
                }
            }else{
                sendSmsToPartner(ticket.partnerId, ticket.id);
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

function sendSmsToPartner(partnerId, ticketId){
    if (process.env.NODE_ENV === "production") {
        Partners.findByPk(partnerId, {include: Users}).then(partner => {
            const firstname = partner.user.firstname;
            const mobile = "32" + partner.user.mobile.substr(1); // E.164 format
            const targetUrl = "https://imoges.be?ticketId=" + ticketId;
            const smsText = "Bonjour " + firstname + ", vous avez un ticket SAV sur Imoges: " + targetUrl;
            const c = new TMClient(process.env.TEXT_MAGIC_USER, process.env.TEXT_MAGIC_KEY);

            c.Messages.send({text: smsText, phones: mobile}, function (err, res) {
                console.log('Messages.send()', err, res);
            });

        }).catch(err => {
            console.log(err);
        });
    }
}
