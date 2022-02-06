const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  const payload = {
    uid,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = {
  generarJWT,
};
