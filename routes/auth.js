/*
    path: api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tenes mínimo 6 caracteres y máximo 20"
    ).isLength({ min: 6, max: 20 }),
    check("email", "El correo es obligatorio").notEmpty(),
    check("email", "El correo debe tener un formato válido").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").notEmpty(),
    check("email", "El correo debe tener un formato válido").isEmail(),
    check("password", "La contraseña es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tenes mínimo 6 caracteres y máximo 20"
    ).isLength({ min: 6, max: 20 }),
    validarCampos,
  ],
  login
);

router.get("/renew", [validarJWT], renewToken);

module.exports = router;
