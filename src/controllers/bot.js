require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Usuario = require('../models/Usuario');
const Admin = require('../models/Admin')

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.setWebHook(`${process.env.IP_HOST}/bot`);

const botController = async (req, res) => {

    const message = req.body.msg;
    const typeUser = req.body.typeUser;
    const usersAtivos = [];
    const usersInativos = [];
    let allUsers;
    let numberOfMessages;

    await Usuario.findAll()
        .then(resBd => {
            allUsers = resBd.map(users => users.toJSON())
        })

    await allUsers.forEach((user) => {
        user.ativo ? usersAtivos.push(user) : usersInativos.push(user);
    })

    if (typeUser === 'all') {

        users.forEach((user) => {
            bot.sendMessage(user.id_telegram, message, {parse_mode: 'HTML'});
        })
        
    }

    if (typeUser === 'actives') {

        usersAtivos.forEach((userAtivo) => {
            bot.sendMessage(userAtivo.id_telegram, message, {parse_mode: 'HTML'});
        })

    }
    if (typeUser === 'inactives') {

        usersInativos.forEach((userInativo) => {
            bot.sendMessage(userInativo.id_telegram, message, {parse_mode: 'HTML'});
        })

    }

    //every time the admin sends a message via bot, +1 is inserted in the qtd_msg_bot column to count sent messages
    await Admin.findAll({where: { id: 1}})
        .then(async (admin) => {

            numberOfMessages = admin.map(user => user.toJSON())
            await Admin.update({
                qtd_msg_bot: numberOfMessages[0].qtd_msg_bot + 1
            }, { where: { id: numberOfMessages[0].id}})

        })

    req.session.success = true
    return res.redirect('/bot-telegram');

}

bot.on('message', (msg) => {
    if (msg.text === '/start') {
        bot.sendMessage(msg.chat.id, `Olá ${msg.chat.first_name}, Seja Bem Vindo!`);
    }
});

module.exports = botController