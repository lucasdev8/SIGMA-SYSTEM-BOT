const Admin = require('../models/Admin');
const Usuario = require('../models/Usuario');

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

        let totalUsers;
        let qtd_msg_bot;
        let usersInativos = []

        //query to fetch number of messages via telegram bot
        await Admin.findAll({ where: { id: 1}})
            .then(admin => qtd_msg_bot = admin.map(adm => adm.toJSON()))
            .catch(err => console.error(err));
        
        //query to get total users
        await Usuario.findAll()
            .then(resBD => totalUsers = resBD.map(users => users.toJSON()))
            .catch(err => console.error(err));

        //mapping to get only inactive users
        totalUsers.map((user) => {
            if (user.ativo === false) {
                usersInativos.push(user)
            }
        })

        res.render('index', 
            {
                NavActiveIndex: true, 
                isLoggedIn: true, 
                totalUsers: totalUsers.length,
                usersInativos: usersInativos.length,
                qtd_msg_bot: qtd_msg_bot[0].qtd_msg_bot
            }
        );
    };

    async users(req, res) {
        let databaseUsers = ''

        await Usuario.findAll().then(resBd => {
            databaseUsers = resBd.map(users => users.toJSON())
        });

        if (databaseUsers.length > 0) {
            res.render('users',{NavActiveUsers: true, table: true, usuarios: databaseUsers, isLoggedIn: true});
        } else {
            res.render('users',{NavActiveUsers: true, table: false, isLoggedIn: true})
        };
    };

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
                }
        );
    };

    async editUser(req, res) {
        let id = req.body.id;

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
                });
            });
    };

    async perfilEdit(req, res) {
        let admin, success, error;

        await Admin.findAll({where: {id: 1}})
            .then((data) => {
                admin = data.map(user => user.toJSON())
            })
        
        if (req.session.success) {
            success = req.session.sucess;
            req.session.success = '';

            return res.render('perfil-edit', 
                {
                    isLoggedIn: true, 
                    email: admin[0].email, 
                    password: admin[0].password,
                    success: true
                }
            );
        }
        if (req.session.errors) {
            error = req.session.errors;
            req.session.errors = '';

            return res.render('perfil-edit', 
                {
                    isLoggedIn: true, 
                    email: admin[0].email, 
                    password: admin[0].password,
                    error: true
                }
            );
        }

        return res.render('perfil-edit', 
            {
                isLoggedIn: true, 
                email: admin[0].email, 
                password: admin[0].password,
            }
        );
    };
};

module.exports = new Pages()