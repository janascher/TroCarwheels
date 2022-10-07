import express from "express";
import { routeUser, routeMiniature, routeBrand, routeCartOffer, routeCart, routeExchange } from "./routes/index.mjs";

import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

const api = express();
api.use(express.json());
api.use(express.urlencoded({extended:true}));
api.use(cookieParser());

//api.use("/api", route);
api.use("/api/users", routeUser);
api.use("/api/miniatures", routeMiniature);
api.use("/api/brands", routeBrand);
api.use("/api/cart", routeCart);
api.use("/api/cart_offer", routeCartOffer);
api.use("/api/exchanges", routeExchange);

api.use(express.static("views"));

api.listen(PORT, () => {console.log(`Servidor criado: listen port ${PORT}`)});

