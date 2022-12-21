import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import signup from "./routes/01.signup.routes.js";
import signin from "./routes/02.signin.routes.js";
import urls from "./routes/03.urls.routes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use(signup);
server.use(signin);
server.use(urls);

const port = process.env.PORT

server.listen(port, () => { console.log(`Listening on port ${port}`) });