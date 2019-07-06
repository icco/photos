const express = require("express");
const next = require("next");
const helmet = require("helmet");
const sslRedirect = require("heroku-ssl-redirect");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  server.use(function(req, res, next) {
    if (req.path != "/healthz") {
      sslRedirect(req, res, next);
    } else {
      next();
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
