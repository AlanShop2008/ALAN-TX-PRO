const express = require("express");
const path = require("path");
const config = require("./config");
const startBot = require("./handler");

const app = express();

// Servir archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Iniciar servidor web
app.listen(config.server.port, () => {
    console.log(`
╔════════════════════════════╗
      ⚡ ALAN TX PRO ⚡
╚════════════════════════════╝

🌐 Panel: http://localhost:${config.server.port}
`);
});

// Iniciar WhatsApp
startBot();
