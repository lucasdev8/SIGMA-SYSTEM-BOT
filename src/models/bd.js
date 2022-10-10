const Sequelize = require('sequelize')
const sequelize = new Sequelize('system-sigma', 'root', 'lucas', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

// sequelize.authenticate()
// .then(() => {
//     console.log('Conectado no banco com sucesso')
// })
// .catch((err) => {
//     console.log(err)
// })

module.exports = { Sequelize, sequelize }