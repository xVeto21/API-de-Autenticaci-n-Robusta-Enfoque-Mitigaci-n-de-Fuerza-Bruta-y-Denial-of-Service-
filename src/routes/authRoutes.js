const express = require("express");
const router = express.Router();

const {
 register,
 login
} = require("../controllers/authController");


const applicationToken = require("../middleware/applicationToken");


router.post(
"/register",
applicationToken,
register
);


router.post(
"/login",
applicationToken,
login
);


module.exports = router;