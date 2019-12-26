const db = require('../models');
const Tickets = db.tickets;
const Ticket_messages = db.ticket_messages;
const Librarycategories = db.librarycategories;
const Libraries = db.libraries;

exports.create = (req, res) => {
    //console.log(req.body);
    Tickets.create({
        priority: req.body.priority,
        partnerId: req.body.partnerId,
        realtyId: req.body.realtyId
    }).then(ticket => {
        Ticket_messages.create({
            message: req.body.message,
            ticketId: ticket.id,
            userId: req.userId
        }).then(message =>{
            if(req.body){
                if(Array.isArray(req.body.pictures)) {
                    // images multiples
                    console.log('multiple');
                    Librarycategories.create({
                        library_category_label: 'ticket',
                        library_category_table_name: 'ticket_messages',
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
                        library_category_label: 'ticket',
                        library_category_table_name: 'ticket_messages',
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