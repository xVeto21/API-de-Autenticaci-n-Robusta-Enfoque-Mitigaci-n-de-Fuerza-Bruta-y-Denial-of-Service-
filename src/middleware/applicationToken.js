const jwt = require("jsonwebtoken");

const applicationToken = (req, res, next) => {

    const token = req.header("app-token");

    if (!token) {
        return res.status(401).json({
            message: "Application token required."
        });
    }

    try {

        jwt.verify(token, process.env.APP_TOKEN_SECRET);

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid application token."
        });

    }

};

module.exports = applicationToken;