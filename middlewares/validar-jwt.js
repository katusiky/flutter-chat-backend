const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
