const db = require('./bd');

const Usuario = db.sequelize.define('usuario', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    id_telegram: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    vencimento: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    ativo: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false 
    }
});

Usuario.sync();

module.exports = Usuario;