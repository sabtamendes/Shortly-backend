import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import urls from "./routes/urls.routes.js";
import signin from "./routes/signin.routes.js";



const server = express();
server.use(cors());
server.use(express.json());


server.use(signin);
server.use(urls);

const port = process.env.PORT

server.listen(port, () => { console.log(`Listening on port ${port}`) });