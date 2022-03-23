const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { Customer } = require('../models');
const onboardEmail = require('../views/onboardEmail');

const onboardCustomer = async (req, res, next) => {
    /**
     * This controller recieves the name and email address
     * of a new customer and sends an onboarding email 
     * with a unique link to the customer
     */
    // find the authenticated user
    const user = res.locals.user;

    // Get request body data
    if (!(req.body.name || req.body.name)) {
        return res.json({
            message: 'Request data missing',
            error: true
        })
    }
    const customerName = req.body.name;
    const customerEmail = req.body.email.trim().toLowerCase();

    // A function for generating a unique string for linkId
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Generate unique random string for link
    const d = new Date();
    let ms = d.valueOf();
    const linkId = uuid() + ms;

    try {
        // create a customer object
        await Customer.create({
            name: customerName,
            email: customerEmail,
            linkId: linkId,
            client: mongoose.Types.ObjectId(user._id)
        });

        /**
         * Send email to customer
         */
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "bbb05535a0a7f7",
                pass: "51a84872d31e00"
            }
        });

        var mailOptions = {
            from: `${user.name} <${user.email}>`,
            to: customerEmail,
            subject: `Onboarding Request From ${user.name}`,
            /**
             * Read the Onboard email html as string, 
             * use regular expression to replace 'CLIENTNAME'
             * and 'LINK' in the email string
             */
            html: onboardEmail.replace(/<CLIENTNAME>|<LINK>/gi, function (x) {
                if (x == '<LINK>') {
                    return `http://localhost:3000/live-onboarding/${linkId}`;
                } else if (x == '<CLIENTNAME>') {
                    return user.name;
                }
            })
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        res.status(201).json({
            message: 'Onboarded Successfully',
            error: false
        })
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }

}

module.exports = { onboardCustomer };