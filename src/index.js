import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import signup from "./routes/01.signup.routes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use(signup);


const port = process.env.PORT

server.listen(port, () => { console.log(`Listening on port ${port}`) });