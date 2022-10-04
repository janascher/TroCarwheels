import express from "express";
import { route } from "./routes/index.mjs";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

const api = express();
api.use(express.json());
api.use(express.urlencoded({extended:true}));

api.use("/api", route);
api.use(express.static("views"));

api.listen(PORT, () => {console.log(`Servidor criado: http://192.168.0.128:${PORT}`)})

