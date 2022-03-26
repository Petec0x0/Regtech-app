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
         * 357696598345-v9vj9ojgkcn4rsg73t9rdjllk1887kd9.apps.googleusercontent.com
         */
        // var transporter = nodemailer.createTransport({
        //     host: "smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "bbb05535a0a7f7",
        //         pass: "51a84872d31e00"
        //     }
        // });

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'ptc0x0@gmail.com',
                clientId: '357696598345-v9vj9ojgkcn4rsg73t9rdjllk1887kd9.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: '1//04Z1zS7qbmsh2CgYIARAAGAQSNwF-L9IrMagMZgVBvg1hjy-8xyqTGHzPXWsZQh0-D4lRdEIvg0oxsrFWra5nY2fXZwElEO_GKlM',
                accessToken: 'ya29.A0ARrdaM_bwRX_8jgTos_mffxGMLFA0cjrPiwGmfI5AtGQn6zNANqLTw_Zu0EJjtCyVdDO2lyApmIgPuVsm4UOwXxCWLAytVKP7uf3lUOnlz9_ip0V11B6y_D_t-tipVU4dZ2PnxG8MaHedP8P-3hLNUZATiQr'
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
                    return `https://regtech-meduim.herokuapp.com/live-onboarding/${linkId}`;
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

const getCustomers = async (req, res, next) => {
    /**
     * This controller gets all the customer from the database
     */
    // find the authenticated user
    const user = res.locals.user;
    try {
        let customers = await Customer.find({ client: user._id });
        res.json({
            data: customers,
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

const getOneCustomer = async (req, res, next) => {
    /**
     * This controller gets a single customer
     */
    // find the authenticated user
    const user = res.locals.user;
    try {
        let customer = await Customer.findOne({ client: user._id, linkId: req.params.linkId });
        // send 404 response when a customer is not found
        if(!customer){
            return res.status(404).json({
                message: 'Customer not found',
                error: true
            })
        }
        res.json({
            data: customer,
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

const updateCustomerStatus = async (req, res, next) => {
    /**
     * This contorller updates the status of 
     * a customer to either onboarded or rejected
     */

     const user = res.locals.user;
     try {
         let customer = await Customer.findOne({ client: user._id, linkId: req.body.linkId });
         // update
         customer.status = req.body.status;
         customer.save();

         res.json({
             data: customer,
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

module.exports = { onboardCustomer, getCustomers, getOneCustomer, updateCustomerStatus };