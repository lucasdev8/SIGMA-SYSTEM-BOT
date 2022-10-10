require('dotenv').config()

module.exports = {
    secret: process.env.SECRET,
    expireIn: '6h'
}