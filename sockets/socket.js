const {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
} = require("../controllers/socket");
const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");

io.on("connection", (client) => {
  const token = client.handshake.headers["authorization"];

  const [valido, uid] = comprobarJWT(token);

  if (!valido) {
    return client.disconnect();
  }

  usuarioConectado(uid);

  client.join(uid);

  client.on("mensaje-personal", async (payload) => {
    await grabarMensaje(payload);

    io.to(payload.para).emit("mensaje-personal", payload);
  });

  client.on("disconnect", () => {
    usuarioDesconectado(uid);
  });
});
