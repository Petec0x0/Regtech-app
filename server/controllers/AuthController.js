const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // make sure the does not exist already
        const user = await User.findOne({ email: req.body.email });
        // check if user exists
        if (user) {
            return res.json({
                message: 'Email address already in use',
                error: true
            })
        } 

        // create a user object
        await User.create({
            name: req.body.name,
            email: req.body.email.trim().toLowerCase(),
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User added successflly',
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

const login = async (req, res, next) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password;

        // find user
        const user = await User.findOne({ email: email });
        // check if user exists
        if (!user) {
            return res.status(401).json({
                message: 'Authentication error: invalid username/password',
                error: true
            })
        }
        // check if user password is correct
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(401).json({
                message: 'Authentication error: invalid username/password',
                error: true
            })
        }
        // return JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // send the token through cookie in the response
        res.cookie('token', token, { httpOnly: true });
        res.json({
            message: 'User loggedin successflly',
            error: false,
            token: token
        })

    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }

}

module.exports = { register, login }
