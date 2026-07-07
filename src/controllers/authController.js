const User = require("../models/User");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // 🔴 revisar bloqueo
    if (user.lockUntil && user.lockUntil > Date.now()) {
        return res.status(403).json({
            mensaje: "Cuenta bloqueada temporalmente"
        });
    }

    // 🔴 password simple (por ahora sin bcrypt)
    if (user.password !== password) {

        user.failedAttempts += 1;

        if (user.failedAttempts >= 5) {
            user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 min
            user.failedAttempts = 0;
        }

        await user.save();

        return res.status(401).json({
            mensaje: "Credenciales incorrectas"
        });
    }

    // ✅ login correcto
    user.failedAttempts = 0;
    user.lockUntil = null;

    await user.save();

    return res.status(200).json({
        mensaje: "Login exitoso"
    });
};
const register = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ mensaje: "Usuario ya existe" });
    }

    const user = await User.create({
        email,
        password
    });

    res.status(201).json({
        mensaje: "Usuario creado",
        user
    });
};

module.exports = { login, register };
