const login = async (req, res) => {

    res.status(200).json({
        mensaje: "Endpoint de login funcionando"
    });

};

module.exports = {
    login
};