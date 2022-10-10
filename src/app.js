//-----------------------------------//
//  Desenvolvido por https://github.com/lucasdev8
//-----------------------------------//
const express = require('express');
const cors = require('cors');
const hbs = require('express-handlebars');
const session = require('express-session');
const router = require('./routers/routers');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');

const app = express();

app.engine('hbs',hbs.engine({ //handlebars configuration
    extname: 'hbs',
    defaultLayout: 'main',
})); app.set('view engine','hbs');

app.use(session({ //session is used in this application only to work with error messages on the frontend
    secret: 'qwertyuiopasdfghjklzxcvbnm',
    resave: false,
    saveUninitialized: true
}));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(80, () => console.log('Aplicação Rodando em http://localhost ...'));

https.createServer({ //ssl certification setup
    cert: fs.readFileSync('src/ssl/code.crt'),
    key: fs.readFileSync('src/ssl/code.key')
}, app).listen(443, () => console.log('Protocolo HTTPS está rodando: https://localhost'));

//running the application's main job as a sub-process
exec('node src/jobs/decrementUserAvailableDays.js');