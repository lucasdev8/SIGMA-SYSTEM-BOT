const Usuario = require('../models/Usuario')

async function create() {

    const res = await Usuario.create({
        nome: 'Lucas',
        telefone: '98985391411',
        id: '7637122',
        vencimento: 1,
        ativo: true
    })

    console.log(res)
}

create()