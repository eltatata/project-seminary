const User = require('../models/Users');

const register = async (req, res) => {
    // console.log(req.body);

    try {
        let user = await User.findOne({email: req.body.email});

        if(user) throw new Error("El usuario ya existe");

        user = new User(req.body);
        await user.save();
        console.log(user);

        res.json("Se creo el usuario");
    } catch (error) {

        res.json(error.message);
    }
}

const login = async (req, res) => {
    console.log(req.body);

    try {
        const userOnDB = await User.findOne({email: req.body.email});

        if (!userOnDB) throw new Error("El usuario no existe");

        if (!userOnDB.comparePassword(req.body.password)) throw new Error("la contraseña es incorrecta");
        
        res.json("Sesion iniciada");
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    register,
    login
}