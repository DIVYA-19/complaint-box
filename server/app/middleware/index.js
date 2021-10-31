const TokenService = require("../services/TokenService")

class Authorize {
    static async check(req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            if(!token) {
                res.status(400).send({
                    message: "Access token not found in request"
                })
            }
            const verifyToken = await TokenService.verifyToken(token);

            if (!verifyToken) {
                res.status(400).send({
                    message: "token is invalid or expired"
                })
            }
            req.userId = verifyToken.id;
            return next();
        } else {
            res.status(404).send({
                message: 'headers are missing!!!'
            })
        }
    }
}

module.exports = Authorize