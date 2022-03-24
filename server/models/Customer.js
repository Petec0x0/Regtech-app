const mongoose = require('mongoose');

// Define the notes database Schema
const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        linkId: {
            type: String,
            required: true, 
            unique: true
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            default: 'pending'
        },
        thumbnailPath: {
            type: String,
            default: 'uploads//thumbnails//avatar_profile.png'
        },
        documentPath: {
            type: String
        },
        videoPath: {
            type: String
        },
        passportNo: {
            type: String
        },
        nationality: {
            type: String
        },
        countryOfResidence: {
            type: String
        },
        phoneNo: {
            type: String
        },
        address: {
            type: String
        },
        occupation: {
            type: String
        },
        dateOfBirth: {
            type: Date
        }

    },
    {
        // Assigns createdAt and updatedAt fields with a Date type
        timestamps: true
    }
);

// Define the 'Note' model with the Schema
const Customer = mongoose.model('Customer', customerSchema);
// Export the module
module.exports = Customer;