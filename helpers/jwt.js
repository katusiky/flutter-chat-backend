const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  const payload = {
    uid,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const comprobarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    return [true, uid];
  } catch (error) {
    return [false];
  }
};

module.exports = {
  generarJWT,
  comprobarJWT,
};
