import express from "express";
import { createServer } from "https";
import "dotenv/config";

const PORT = 443;
const app = express();

app.use(express.static("dist"));

const options = {
  key: process.env.SSL_KEY,
  cert: process.env.SSL_CERT,
};

const server = createServer(options, app);

server.listen(PORT, () => {
  console.log(`https://127.0.0.1:${PORT}`);
});

app.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
