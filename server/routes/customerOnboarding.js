const express = require('express');
const router = express.Router();
const { Customer } = require('../models');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname == 'document'){
            cb(null, './uploads/docs/');
        }else if(file.fieldname == 'video'){
            cb(null, './uploads/videos/');
        }else{
            cb(null, './uploads/thumbnails/');
        }
    },
    filename: function (req, file, cb) {
        const d = new Date();
        let ms = d.valueOf();
        cb(null, ms + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

const cpUpload = upload.fields([
    { name: 'document', maxCount: 1 }, 
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);
router.post("/upload", cpUpload, async (req, res, next) => {
    /**
     * This controller stores the data when a new 
     * customer clicks on the recieved email link and
     * onboards him/her self 
     */
    try {
         let customer = await Customer.findOne({ linkId: req.body.linkId });
         // Return an error if customer is not valid
         if(!customer){
            return res.status(401).json({
                message: 'Authorization error: broken/invalid link',
                error: true
            })
         }
         customer.documentPath = req.files['document'][0]['path'];
         customer.videoPath = req.files['video'][0]['path'];
         customer.thumbnailPath = req.files['thumbnail'][0]['path'];
         customer.passportNo = req.body.passportNo;
         customer.nationality = req.body.nationality;
         customer.countryOfResidence = req.body.countryOfResidence;
         customer.phoneNo = req.body.phoneNo;
         customer.address = req.body.address;
         customer.occupation = req.body.occupation;
         customer.dateOfBirth = req.body.dateOfBirth;
         customer.name = req.body.name;
         customer.validaition = req.body.validaition;
         customer.save();

        res.status(201).json({
            message: 'Customer Onboarding Successfull',
            error: false
        })
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }

    


});

module.exports = router;