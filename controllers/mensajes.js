const { response } = require("express");
const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res = response) => {
  try {
    const miId = req.uid;
    const mensajesDe = req.params.de;

    const mensajes = await Mensaje.find({
      $or: [
        { de: miId, para: mensajesDe },
        { de: mensajesDe, para: miId },
      ],
    })
      .sort("-createdAt")
      .limit(30);

    res.json({
      ok: true,
      mensajes,
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
  obtenerChat,
};
