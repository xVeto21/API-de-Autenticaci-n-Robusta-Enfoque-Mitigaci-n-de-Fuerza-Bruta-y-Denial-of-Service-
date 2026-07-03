const express = require("express");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");

dotenv.config();

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");

connectDB();

const app = express();

app.use(express.json());

app.use(mongoSanitize());

app.use("/api/v2/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor ejecutándose en el puerto ${PORT}`);

});