import { Router } from "express";
import authenticateToken from "./authtenticate.mjs";
import { exchangesCtrl } from "../controllers/api/index.mjs";

const routeExchange = Router();

// Exchanges
routeExchange.get("/", authenticateToken, exchangesCtrl.getExchanges);
routeExchange.get("/:id", authenticateToken, exchangesCtrl.getExchangeById);
routeExchange.get("/user/:id", authenticateToken, exchangesCtrl.getExchangeByUserId);
routeExchange.post("/", authenticateToken, exchangesCtrl.addExchange);
routeExchange.put("/status/:id/:status", authenticateToken, exchangesCtrl.updExchangeStatus);
routeExchange.put("/close/:id", authenticateToken, exchangesCtrl.closeExchange);
routeExchange.delete("/:id", authenticateToken, exchangesCtrl.delExchange);
routeExchange.get("/log/:id", authenticateToken, exchangesCtrl.getExchangeLog);
routeExchange.post("/log/:id", authenticateToken, exchangesCtrl.addExchangeLog);

export { routeExchange };  

