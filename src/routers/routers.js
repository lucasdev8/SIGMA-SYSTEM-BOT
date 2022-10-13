const { Router } = require('express');
const router = Router();

const AuthMiddleware = require('../middlewares/authenticate');

const pages = require('../controllers/pages');
const utils = require('../controllers/utils');
const login = require('../controllers/login'); //controller authenticate
const botController = require('../controllers/bot');

// CONTROLLERS PAGES
router.get('/', pages.login); //PUBLIC ROUTER

router.get('/index', AuthMiddleware, pages.index);

router.get('/cadastro', AuthMiddleware, pages.register);

router.get('/users', AuthMiddleware, pages.users);

router.get('/bot-telegram', AuthMiddleware, pages.bot);

router.post('/edit-user', AuthMiddleware, pages.editUser);

router.get('/perfil-edit', AuthMiddleware, pages.perfilEdit);

// CONTROLLERS UTILS

router.post('/authenticate', login.index) //PUBLIC ROUTER

router.post('/register', AuthMiddleware, utils.registerUser);

router.post('/update-user', AuthMiddleware, utils.updateUser);

router.post('/delete-user', AuthMiddleware, utils.deleteUser);

router.post('/suspender-user', AuthMiddleware, utils.suspendUser);

router.post('/reativar-user', AuthMiddleware, utils.reactivateUser);

router.post('/bot', AuthMiddleware, botController); //bot controller

router.post('/update-admin', AuthMiddleware, utils.updateAdminData);

module.exports = router