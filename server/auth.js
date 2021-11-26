const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.json("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.json("Invalid Token");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    var username = decoded.username;

    return res.json(username);
};

module.exports = verifyToken;