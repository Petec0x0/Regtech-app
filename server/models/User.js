const mongoose = require("mongoose");

// Define the notes database Schema
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String
      },
    }, 
    {
      // Assigns createdAt and updatedAt fields with a Date type
      timestamps: true
    }
);

// Define the 'Note' model with the Schema
const User = mongoose.model("User", userSchema);
// Export the module
module.exports = User;