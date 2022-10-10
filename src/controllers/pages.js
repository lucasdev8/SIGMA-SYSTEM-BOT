const Usuario = require('../models/Usuario')

class Pages {
    login(req, res) {
        if (req.session.errors) {
            const erro = req.session.errors
            req.session.errors = ''
            return res.render('login', {isLoggedIn: false, loginError: erro})
        }
        if (req.session.errors) {
            const erro = req.session.errors
            req.session.errors = ''
            return res.render('login', {isLoggedIn: false, loginError: erro})
        }
        return res.render('login', {isLoggedIn: false, error: false})
    }

    register(req, res) {
        if (req.session.errors) {
            let errosArrays = req.session.errors;
            req.session.errors = '';
            return res.render('register', {NavActiveRegister: true, isLoggedIn: true, error: errosArrays}) 
        }
        if (req.session.success) {
            req.session.success = false;
            return res.render('register', {NavActiveRegister: true, isLoggedIn: true, MsgSuccess: true}) 
        }
        return res.render('register', {NavActiveRegister: true, isLoggedIn: true})
    }

    async index(req, res) {
        let totalUsers = ''
        await Usuario.findAll().then(resBD => {
            totalUsers = resBD.map(users => users.toJSON())
        })
        
        res.render('index', {NavActiveIndex: true, isLoggedIn: true, totalUsers: totalUsers.length})
    }

    async users(req, res) {
        let databaseUsers = ''

        await Usuario.findAll().then(resBd => {
            databaseUsers = resBd.map(users => users.toJSON())
        })

        if (databaseUsers.length > 0) {
            res.render('users',{NavActiveUsers: true, table: true, usuarios: databaseUsers, isLoggedIn: true});
        } else {
            res.render('users',{NavActiveUsers: true, table: false, isLoggedIn: true})
        }
    }

    bot(req, res) {

        if (req.session.success) {
            req.session.success = ''
            return res.render('bot', 
                {
                    NavActiveBot: true, 
                    isLoggedIn: true,
                    success: true
                })
        }
        return res.render('bot', 
                {
                    NavActiveBot: true, 
                    isLoggedIn: true
                })

    }

    async editUser(req, res) {
        let id = req.body.id

        await Usuario.findByPk(id)
            .then((data) => {
                return res.render('edit-user', 
                {
                    isLoggedIn: true,
                    error: false,
                    id: data.id,
                    nome: data.nome,
                    telefone: data.telefone,
                    id_telegram: data.id_telegram,
                    vencimento: data.vencimento
                })
            })
            .catch((erro) => {
                return res.render('edit-user', 
                {   
                    isLoggedIn: true,
                    error: true,
                    problema: 'Ocorreu um erro!'
                })
            })
    }

}

module.exports = new Pages()