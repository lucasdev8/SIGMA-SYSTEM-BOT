const Admin = require('./Admin')

// async function getUsers() {
//     const res = await Admin.findAll()
//     console.log(res)
// }

// getUsers()

async function create() {

    const res = await Admin.create({
        email: 'lucas@gmail.com',
        password: '12345',
        qtd_msg_bot: 0
    })
    console.log(res)
}

create()