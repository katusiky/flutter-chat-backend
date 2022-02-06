const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        message: "El correo ya está registrado",
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar el password
    const salt = await bcrypt.genSalt();
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

    // Generar el JWT
    const token = generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Email no encontrado",
      });
    }

    // Validar el password
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "La contraseña no es válida",
      });
    }

    // Generar el JWT
    const token = generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid } = req;

  try {
    // Generar el JWT
    const token = generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
