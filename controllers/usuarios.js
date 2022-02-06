const { response } = require("express");
const Usuario = require("../models/usuario");

const getUsuarios = async (req, res = response) => {
  try {
    const desde = Number(req.query.desde) || 0;

    const usuarios = await Usuario.find({ _id: { $ne: req.uid } })
      .sort("-online")
      .skip(desde)
      .limit(20);

    res.json({
      ok: true,
      usuarios,
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
  getUsuarios,
};
