const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const config = require("../config/config")

const createToken = async user => {
    try {
        const payload = {
            id: user._id
        };

        const options = {
            algorithm: "HS512",
            subject: user._id.toString(),
            expiresIn: config.expireToken,
        }

        const token = await jwt.sign(payload, config.jwtSecret, options);

        return token
    } catch (err) {
        console.log(err);
    }
}

const createRefreshToken = async user => {
    try {
        const payload = {
            id: user._id
        };

        const options = {
            algorithm: "HS512",
            subject: user._id.toString()
        }

        const token = await jwt.sign(payload, config.refreshTokenSecret, options);

        return token
    } catch (err) {
        console.log(err);
    }
}

const verifyToken = async token => {
    try {
        const data = await jwt.verify(token, config.jwtSecret);

        return data;
    } catch (err) {
        return false;
    }
}

const addRefreshTokenUser = async (user, token) => {
    try {
        user.refreshTokens.push(token);
        await user.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {createToken, createRefreshToken, verifyToken, addRefreshTokenUser}