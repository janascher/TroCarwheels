import { Router } from "express";
import authenticateToken from "./authtenticate.mjs";
import { cartCtrl } from "../controllers/api/index.mjs";

const routeCart = Router();

// Cart
routeCart.get("/", authenticateToken, cartCtrl.getCarts);
routeCart.get("/:id", authenticateToken, cartCtrl.getCartById);
routeCart.get("/find/:id_miniature", authenticateToken, cartCtrl.getFindMiniatureId);
routeCart.get("/user/:id", authenticateToken, cartCtrl.getCartByUserId);
routeCart.post("/", authenticateToken, cartCtrl.addCart);
routeCart.put("/status/:id/:status", authenticateToken, cartCtrl.updCartStatus);
routeCart.delete("/:id", authenticateToken, cartCtrl.delCart);

export { routeCart };  

