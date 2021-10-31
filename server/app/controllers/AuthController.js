const UserModel = require('../models/User');
const TokenService = require("../services/TokenService")

class AuthController {
    static async signin(req, res) {
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user) {
            res.status(400).send({
                message: 'User not found'
            })
        }

        if (req.body.password !== user.password) {
            res.status(400).send({
                message: 'password is incorrect!!'
            })
        }

        const token = await TokenService.createToken(user);
        const refreshToken = await TokenService.createRefreshToken(user);

        await TokenService.addRefreshTokenUser(user, refreshToken);

        res.json({ user: {_id: user._id, name: user.name, email: user.email, token, refreshToken} })
    }

    static async signup(req, res) {
        const userExisted = await UserModel.findOne({ email: req.body.email });
        if(userExisted) {
            
        }

        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        await user.save();

        res.json({ status: "success" })
    }

    static async logout(req, res) {
        await UserModel.findOneAndUpdate({ email: req.body.email }, {refreshTokens: []});

        res.sendStatus(200);
    }

    static async getRefreshToken(req, res) {
        const refreshToken = req.headers.authorization.split(' ')[1];
        const user = await UserModel.findOne({ email: req.body.email });

        if (!refreshToken) {
            res.sendStatus(401)
        }

        if (!user.refreshTokens.includes(refreshToken)) {
            res.sendStatus(403)
        }

        user.refreshTokens.push()
        const token = await TokenService.createToken(user);

        res.json({token})
    }
}

module.exports = AuthController