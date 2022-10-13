const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const config = require('../config/auth')

class LoginCrontroller {

    async login(req, res) {
        const { email, password } = req.body
        
        const adminExist = await Admin.findOne({ where: {email} })
        const erros = []

        if (!adminExist) {

            erros.push({mensagem: 'Usuário não existe!'})
            req.session.errors = erros
            return res.redirect('/')

        }

        if (!(adminExist.password == password)) {

            erros.push({mensagem: 'Senha digitada está incorreta!'})
            req.session.errors = erros
            return res.redirect('/')
            
        }

       const token = jwt.sign(
            {id: adminExist.id},
            config.secret,
            {expiresIn: config.expireIn}
       )
       res.cookie('token', token, { maxAge: 5*60*1000, httpOnly: true, sameSite: 'strict' });

       return res.redirect('/index')
    }

    logout(req, res) {

        res.cookie('token', null, { maxAge: 5*60*1000, httpOnly: true, sameSite: 'strict' });
        
        return res.redirect('/');

    }
}

module.exports = new LoginCrontroller();