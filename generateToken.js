require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = jwt.sign(
    {
        app: "Proyecto_2"
    },
    process.env.APP_TOKEN_SECRET
);

console.log("Application Token:");
console.log(token);