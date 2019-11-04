const nodeMailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const auth = {
    auth:{
        api_key: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};



exports.sendMessage = (req, res) => {
    const transporter = nodeMailer.createTransport(mailGun(auth));

    const mailOptions = {
        from: 'Contact site web <postmaster@sandbox644951b806604a91a3f8caaf096be0ce.mailgun.org>',
        to: 'info@absolute-fx.com',
        subject: 'Message de ' + req.body.name,
        html: setMessageText(req.body)
    };
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('Error!');
            res.status(500).json({
                "description": err.statusCode,
                "error": err,
                success: false
            });
        } else{
            console.log('Message sent!');
            console.log(data);
            res.status(200).json({
                "description": "Message envoyé",
                success: true
            });
        }
    });
};

function setMessageText(data){
    let message = "<p>Bonjour, vous avez reçu un message provenant du site web</p><hr>";
    message += "<p></p>De : " + data.name + "<br>";
    message += "Email: <a href='mailto:" + data.email + "'>" + data.email + "</a></p>";
    if(data.project !== ""){
        message += "<p>Concernant le projet <b>" + data.projectLabel + "</b>";
        if(data.realty !== ""){
            message += " et le bien <b>" + data.realtyLabel + "</b>";
        }
        message += "</p>";
    }
    message += "<hr>";
    message += "<p>" + data.message + "</p>";

    return message;
}