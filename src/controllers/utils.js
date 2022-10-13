const Usuario = require('../models/Usuario');
const Admin = require('../models/Admin');

class Utils {
    authenticate(req, res) {
        res.redirect('/index')
    }

    async registerUser(req, res) {
        const erros = []; 

        if (req.body.nome && req.body.telefone && req.body.id_telegram && req.body.vencimento) {

            let {nome, telefone, id_telegram, vencimento} = req.body

            //Insert dados no banco de dados
            const resultData = await Usuario.create({

                nome, telefone, id_telegram, vencimento, ativo: true
         
            });
            console.log('OK: '+resultData)
            req.session.success = true
            res.redirect('/cadastro')

        } else {
            erros.push({mensagem: 'Dados não podem ser vazios!'})
            req.session.errors = erros
            req.session.success = false
            return res.redirect('/cadastro')
        }
    }

    async updateUser(req, res) {
        const { id, nome, telefone, id_telegram, vencimento } = req.body

        await Usuario.update(
            {

            nome,
            telefone,
            id_telegram,
            vencimento,
            ativo: true

            },
            {
                where: {id: id}
            }
        ).then(() => {
            
            return res.redirect('/users')

        }).catch((err) => {

            console.log(err)

        })
    }

    async deleteUser(req, res) {

        const { id } = req.body

        await Usuario.destroy({
            where: {
                id: id
            }
        }).then(() => res.redirect('/users')).catch(() => res.redirect('/users'))

    }

    async suspendUser(req, res) {
        const id = req.body.id;

        await Usuario.update({
            ativo: false
        }, { where: {id: id}})
        
        return res.redirect('/users');

    }

    async reactivateUser(req, res) {
        const id = req.body.id;

        await Usuario.update({
            ativo: true
        }, { where: {id: id}})

        return res.redirect('/users');

    }

    async updateAdminData(req, res) {

        const { email, password} = req.body;
    
        await Admin.update({

            email: email,
            password: password

        }, {where: { id: 1}})
            .then(() => req.session.success = true)
            .catch(() => req.session.errors = true);

        return res.redirect('/perfil-edit');
    }
}

module.exports = new Utils()