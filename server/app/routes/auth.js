const { Router } = require('express');
const AuthController = require('../controllers/AuthController')


const router = Router();

router.post(
    '/auth/signin',
    AuthController.signin
);

router.post(
    '/auth/signup',
    AuthController.signup
)

router.post(
    '/auth/logout',
    AuthController.logout
)

router.post(
    '/refresh-token',
    AuthController.getRefreshToken
)

module.exports = router