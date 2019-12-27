const db = require('../models');
const Tickets = db.tickets;
const Ticketmessages = db.ticketmessages;
const Librarycategories = db.librarycategories;
const Libraries = db.libraries;

exports.create = (req, res) => {
    //console.log(req.body);
    Tickets.create({
        priority: req.body.priority,
        partnerId: req.body.partnerId,
        realtyId: req.body.realtyId,
        title: req.body.title
    }).then(ticket => {
        Ticketmessages.create({
            message: req.body.message,
            ticketId: ticket.id,
            userId: req.userId
        }).then(message =>{
            if(req.body){
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
                            res.send({ticket: ticket, message: message, allPictures: allPictures});
                        }).catch(function(error){
                            res.json(error);
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
                            res.send({ticket: ticket, message: message, libraries: libraries});
                        });
                    });
                }
            }else{
                res.status(200).send({ticket: ticket, message: message});
            }
        });
    });
};

exports.getOne = (req, res) => {
    Tickets.scope(['withAll']).findByPk(req.query.id).then(ticket => {
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