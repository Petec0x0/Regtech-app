const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // create a user object
        const user = await User.create({
            name: req.body.name,
            email: req.body.email.trim().toLowerCase(),
            password: hashedPassword
        });

        res.json({
            message: 'User added successflly',
            error: false
        })

    } catch (err) {
        res.json({
            message: 'An error occured',
            error: true
        })
    }
}

const login = async (req, res, next) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password;

        // find user
        const user = await User.findOne({ email: email });
        // check if user exists
        if (!user) {
            res.status(401).json({
                message: 'Authentication error: invalid username/password',
                error: true
            })
        }
        // check if user password is correct
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            res.status(401).json({
                message: 'Authentication error: invalid username/password',
                error: true
            })
        }
        // return JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.json({
            message: 'User loggedin successflly',
            error: false,
            token: token
        })

    } catch (err) {
        console.log(err);
    }

}

module.exports = { register, login }
