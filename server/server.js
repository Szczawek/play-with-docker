import express from "express";
import { corsConfig, helmetConfig } from "./content/serverConfig.js";
import { createServer } from "https";
import { mysqlDB } from "./content/databaseConfig.js";
import "dotenv/config";
const PORT = 443;
const app = express();

const options = {
  key: process.env.SSL_KEY,
  cert: process.env.SSL_CERT,
};
const server = createServer(options, app);

app.use(corsConfig);
app.use(helmetConfig);

app.get("/", async (req, res) => {
  try {
    const firstPromise = new Promise((resolve, reject) =>
      mysqlDB.query("SELECT * FROM users", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    );
    // const secondPromise = new Promise((resolve, reject) =>
    //   pgDB.query("SELECT * FROM magazine", (err, result) => {
    //     if (err) return reject(err);
    //     resolve(result.rows);
    //   })
    // );
    const [valueOne] = await Promise.all([
      firstPromise
    ]);
    res.json({valueOne});
  } catch (err) {
    console.log(err);
    res.send("Error with db", err);
  }
});

server.listen(PORT, () => {
  console.log(`https://127.0.0.1:${PORT}`);
});
