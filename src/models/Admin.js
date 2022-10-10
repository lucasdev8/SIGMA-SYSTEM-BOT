const db = require('./bd')

const Admin = db.sequelize.define('admin', {

    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    }

}) 

Admin.sync()

module.exports = Admin