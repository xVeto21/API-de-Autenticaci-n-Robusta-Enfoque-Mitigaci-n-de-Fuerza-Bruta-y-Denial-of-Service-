const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v2/auth", authRoutes);

app.use(helmet());


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor ejecutándose en ${PORT}`);
});