const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/authController");
const limiter = require("../middleware/limiter");
const applicationToken = require("../middleware/applicationToken");


router.use(applicationToken);
router.post("/register", register);
router.post("/login", limiter, login);

module.exports = router;