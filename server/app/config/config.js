require("dotenv").config()

module.exports = {
    uri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    expireToken: process.env.EXPIRES,
    states: ["open", "closed", "pending", "in progess"]
}