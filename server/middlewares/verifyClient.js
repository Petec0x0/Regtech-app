const jwt = require('jsonwebtoken');
const {User} = require('../models');

const verifyClient = async (req, res, next) => {
    try {
        if(!(req.cookies.token)){
            return res.status(401).json({
                message: 'Authentication error',
                error: true
            });
        }else{
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            // confirm the user exists
            // find the authenticated user
            const user = await User.findOne({ email: decoded.email });
            if(!user){
                return res.status(401).json({
                    message: 'Authentication error',
                    error: true
                });
            }
            // pass the user email throught this middleware
            res.locals.user = user;
            next();
        }
    } catch (err) {
        // console.log(err);
        return res.status(401).json({
            message: 'Session Invalid',
            error: true
        });
    }
}

module.exports = verifyClient;