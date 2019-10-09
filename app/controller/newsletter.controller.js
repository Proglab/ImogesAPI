
    const mailjet = require ('node-mailjet')
        .connect(process.env.MAILJET_KEY,process.env.MAILJET_SECRET);
    const db = require('../models');
    const Users = db.users;


    /*
    function createContact(user, client)
    {
        console.log(user);
        return mailjet.post("contact")
        .request({
            "ContactsLists":[
                {
                    "ListID": [2917],
                    "action": "addnoforce"
                }
            ],
            "Contacts":[
                {
                    "Email": user.email,
                    "Name": user.firstname + " " + user.lastname,
                    "Properties": {
                        "Client": client,
                        "Lastname": user.firstname,
                        "Firstname": user.lastname
                    }
                }
            ]
        });
    }
    */
    function createContact(user, client)
    {
        console.log(user);
        return mailjet.post("contact")
            .request({
                "Email": user.email,
                "IsExcludedFromCampaigns":"true",
                "Name": user.firstname + " " + user.lastname
            });
    }

    // Post a Customer
    exports.create = (req, res) => {
        Users.findOne({ where: {email: req.body.email} }).then(user => {
            createContact(user, true)
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            });
        }).catch((err) => {
            user = {};
            user.email = req.body.email;
            user.firstname = "";
            user.lastname = "";
            createContact(user, false).then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err)
            });
        });
    };

    // Delete a Customer by Id
    exports.delete = (req, res) => {
        const id = req.params.customerId;
        Users.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).send('deleted successfully a customer with id = ' + id);
        });
    };