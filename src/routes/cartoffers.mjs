import { Router } from "express";
import authenticateToken from "./authtenticate.mjs";
import { cartCtrl } from "../controllers/api/index.mjs";

const routeCartOffer = Router();

// Cart Offers
routeCartOffer.get("/:cart_id", authenticateToken, cartCtrl.getCartOffer);
routeCartOffer.post("/:cart_id", authenticateToken, cartCtrl.addCartOffer);
routeCartOffer.put("/status/:cart_id/:user_id/:miniature_id/:status", authenticateToken, cartCtrl.updCartOfferStatus);
routeCartOffer.delete("/:cart_id/:user_id/:miniature_id", authenticateToken, cartCtrl.delCartOffer);

export { routeCartOffer };  

