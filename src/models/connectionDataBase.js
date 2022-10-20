require('dotenv').config()
const Sequelize = require('sequelize')

const bdName = process.env.DB_NAME;
const bdUsername = process.env.DB_USERNAME;
const bdPassword = process.env.DB_PASSWORD;
const bdHost = process.env.DB_HOST;
const bdPort = process.env.DB_PORT;

const sequelize = new Sequelize(bdName, bdUsername, bdPassword, {
    host: bdHost,
    port: bdPort,
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

sequelize.authenticate()
.then(() => {
    console.log('Conectado no banco com sucesso')
})
.catch((err) => {
    console.log(err)
})

module.exports = { Sequelize, sequelize }