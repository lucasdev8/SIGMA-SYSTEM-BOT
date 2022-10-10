const jwt = require('jsonwebtoken')
const config = require('../config/auth')

module.exports = async (req, res, next) => {
 
    let jwtToken = req.cookies.token

    // if(!jwtToken) {
    //     res.status(401).json({
    //         message: 'Not Authorized'
    //     }) 
    // }

    try {
        const decoded = jwt.verify(jwtToken, config.secret)
        
        if (!decoded) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: 'Token Expired'
            })
        } else {
            req.user_id = decoded.id
            next()
        }
    } catch {
        return res.redirect('/')
    }
}